package com.gascitech.smartagri.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
//		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
	//	response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//		String message;
//		// Check if the request as any exception that we have stored in Request
//		 Exception exception = (Exception) request.getAttribute("exception");
//		
//		// If yes then use it to create the response message else use the authException
//		if (exception != null) {
//			
//			byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("cause", exception.toString()));
//			response.getOutputStream().write(body);
//		} else {
//			if (authException.getCause() != null) {
//				message = authException.getCause().toString() + " " + authException.getMessage();
//			} else {
//				message = authException.getMessage();
//			}
//
//			byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("error", message));
//
//			
//		
//		
//		
//	}
		//System.out.println(request.getAttribute("expired").toString());
		String expired = (String) request.getAttribute("expired");
		String error="invalid username or password";
	        System.out.println(expired);
	        if (expired!=null){
	        	//response.sendError(HttpServletResponse.SC_UNAUTHORIZED,expired);
	        	 response.setContentType("application/json");
	             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	             response.getOutputStream().println("{ \"error\": \"" + expired + "\" }");
	        }else{
	        	 response.setContentType("application/json");
	             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	             response.getOutputStream().println("{ \"error\": \"" +error+ "\" }");
	        }

}
}