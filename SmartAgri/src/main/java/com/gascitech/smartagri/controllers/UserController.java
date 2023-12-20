package com.gascitech.smartagri.controllers;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.gascitech.smartagri.entity.AuthenticationResponse;
import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.History;
import com.gascitech.smartagri.entity.UserEntity;
import com.gascitech.smartagri.service.UserService;
import com.gascitech.smartagri.utils.EncrypterHelper;
import com.gascitech.smartagri.utils.JwtUtil;

@RestController
public class UserController {
	@Autowired
	UserService us;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private com.gascitech.smartagri.service.MyUserDetailsService userDetailsService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	@PostMapping("/register")
	public DeviceDetails regUser(@RequestBody DeviceDetails dd) {
		return us.regUser(dd);
	}

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> m,
			HttpServletResponse res, HttpServletRequest req) throws Exception {
		UserEntity authenticationRequest = new UserEntity();
		authenticationRequest.setEmail(m.get("email"));
		authenticationRequest.setPassword(m.get("password"));
	
		try {
			
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
					authenticationRequest.getPassword()));
		
		} catch (BadCredentialsException e) {
		
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
//		String jwt1 = EncrypterHelper.encrypt(jwt);
		List<DeviceDetails> dd =us.getuserdata(authenticationRequest.getEmail());
		return ResponseEntity.ok(new AuthenticationResponse(jwt,dd));
	}

	@GetMapping("/getalluserwithdevice")
	public List<DeviceDetails> getAllUser() {
		return us.getAllUserwithdevice();
	}

	@GetMapping("/getallusers")
	public List<UserEntity> getAllUsers() {
		return us.getAllUsers();
	}
	@GetMapping("/gethistory/{did}")
	public List<History> getallhistory(@PathVariable("did")long id){
		return us.gethistory(id);
		
		
	}
	@GetMapping("/gethistorybtype/{did}/{type}")
	public List<History> gethistorybtype(@PathVariable("did")long id, @PathVariable("type") String type){
		return us.gethistorybtype(id,type);
		
		
	}
}
