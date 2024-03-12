package com.angular.springboot.foodrecipe.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtUtils {

    @Value("${jwt.secret.key}")
    private String jwtSecretKey;

    public String generateJwtToken(Authentication auth) {
        Date currentDate = new Date(System.currentTimeMillis());
        SecretKey secret = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());

        //(1000 * 60 * 60 * 12) = 12 hours
        String jwtToken = Jwts.builder()
                .setIssuedAt(currentDate)
                .setExpiration(new Date(currentDate.getTime()+(1000 * 60 * 60 * 12)))
                .claim("email", auth.getName())
                .signWith(secret, SignatureAlgorithm.HS256).compact();

        return jwtToken;
    }

    public String getEmailClaim(String jwt) {
        SecretKey secret = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());
        //We expect jwt to have 'Bearer ' characters.
        //We need to exclude it and only extract
        //the token
        String token  = jwt.substring(7);
        Claims claims =
                Jwts.parserBuilder().
                        setSigningKey(secret).
                        build().
                        parseClaimsJws(token).
                        getBody();
        String email = String.valueOf(claims.get("email"));

        return email;
    }
}
