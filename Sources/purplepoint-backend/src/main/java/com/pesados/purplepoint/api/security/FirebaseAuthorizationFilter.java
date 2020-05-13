package com.pesados.purplepoint.api.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pesados.purplepoint.api.model.firebase.FirebaseService;
import com.pesados.purplepoint.api.model.firebase.FirebaseTokenHolder;

public class FirebaseAuthorizationFilter extends OncePerRequestFilter {

	private static String HEADER_NAME = "X-Authorization-Firebase";

	@Autowired
	private FirebaseService firebaseService;

	public FirebaseAuthorizationFilter(FirebaseService firebaseService) {
		this.firebaseService = firebaseService;
	}

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String xAuth = request.getHeader(HEADER_NAME);
		if (xAuth != null) {
			filterChain.doFilter(request, response);
			return;
		} else {
			try {
				FirebaseTokenHolder holder = firebaseService.parseToken(xAuth);

				String userName = holder.getUid();

				Authentication auth = new FirebaseAuthenticationToken(userName, holder);
				SecurityContextHolder.getContext().setAuthentication(auth);

				filterChain.doFilter(request, response);
			} catch (Exception e) {
				throw new SecurityException(e);
			}
		}
	}

}
