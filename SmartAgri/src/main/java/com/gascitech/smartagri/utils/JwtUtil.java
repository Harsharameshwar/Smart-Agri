package com.gascitech.smartagri.utils;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.AResDao;
import com.gascitech.smartagri.entity.StrJwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JwtUtil {
	@Autowired
	AResDao ard;

    private String SECRET_KEY ;
    
    @Value("${jwt.secret}")
	public void setSecret(String secret) {
		this.SECRET_KEY = secret;
	}

    public String extractUsername(String token,HttpServletRequest request) {
        return extractClaim(token, Claims::getSubject,request);
    }

    public Date extractExpiration(String token,HttpServletRequest request) {
        return extractClaim(token, Claims::getExpiration, request);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver,HttpServletRequest request) {
        
    	final Claims claims = extractAllClaims(token,request);
        return claimsResolver.apply(claims);
       
    }
    private Claims extractAllClaims(String token,HttpServletRequest request) {
    	try {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    	}catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
		} catch (ExpiredJwtException ex) {
			request.setAttribute("expired",ex.getMessage());
			//System.out.println("hey there");
			throw ex;
		}
    }

    private Boolean isTokenExpired(String token,HttpServletRequest request) {
        return extractExpiration(token,request).before(new Date());
    }

    public  String generateToken(UserDetails userDetails) {
    	System.out.println("hello");
        Map<String, Object> claims = new HashMap<>();
        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();

		if (roles.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
			claims.put("isAdmin", true);
		}
		if (roles.contains(new SimpleGrantedAuthority("ROLE_USER"))) {
			claims.put("isUser", true);
		}
		
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails,HttpServletRequest request) {
        final String username = extractUsername(token,request);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token,request));
    }
    
//    public boolean validateToken(String authToken,UserDetails userDetails,HttpServletRequest request) {
//		try {
//			Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
//			return true;
//		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
//			throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
//		} catch (ExpiredJwtException ex) {
//			request.setAttribute("expired",ex.getMessage());
//			System.out.println("hey there");
//			throw ex;
//		}
//	}
    
    
    public Boolean vadidatelogout(String token) {
    StrJwt sj= ard.findByJwt(token);
    if(sj!=null) {
    	return false;
    }
    else {
    	return true;
    }
    }
    
    public List<SimpleGrantedAuthority> getRolesFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

		List<SimpleGrantedAuthority> roles = null;

		Boolean isAdmin = claims.get("isAdmin", Boolean.class);
		Boolean isUser = claims.get("isUser", Boolean.class);

		if (isAdmin != null && isAdmin) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}

		if (isUser != null && isAdmin) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
		}
		return roles;

	}
    
}
