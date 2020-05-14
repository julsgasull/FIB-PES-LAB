package com.pesados.purplepoint.api.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.pesados.purplepoint.api.exception.FirebaseTokenInvalidException;
import com.pesados.purplepoint.api.model.firebase.FirebaseTokenHolder;

public class FirebaseParser {
	public boolean parseToken(String idToken) {
		if (idToken == null || idToken == "") {
			throw new IllegalArgumentException("FirebaseTokenBlank");
		}
		try {
			/*
			Task<FirebaseToken> authTask = 
					FirebaseAuth.getInstance().verifyIdToken(idToken);

			Tasks.await(authTask);

			return new FirebaseTokenHolder(authTask.getResult());*/
			
			if (FirebaseAuth.getInstance().verifyIdToken(idToken) == null)
				return false;
			else return true;
		} catch (Exception e) {
			throw new FirebaseTokenInvalidException(e.getMessage());
		}
	}
}
