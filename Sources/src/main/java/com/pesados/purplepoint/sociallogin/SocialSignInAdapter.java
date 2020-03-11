package com.pesados.purplepoint.sociallogin;

import com.pesados.purplepoint.util.ConnectionHelper;
import com.pesados.purplepoint.util.ConnectionType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.ArrayList;
import java.util.List;

@Service
public class SocialSignInAdapter implements SignInAdapter
{
    @Override
    public String signIn(String userId, Connection&lt;?&gt; connection, NativeWebRequest request)
    {
        Authentication authentication = getAuthentication(userId, connection);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return "/socialloginsuccess";
    }

    private Authentication getAuthentication(String localUserId, Connection&lt;?&gt; connection)
    {
        List&lt;GrantedAuthority&gt; roles = getRoles(connection);

        String password = null;

        Authentication authentication = new UsernamePasswordAuthenticationToken(localUserId, password, roles);

        return authentication;
    }

    private List&lt;GrantedAuthority&gt; getRoles(Connection&lt;?&gt; connection)
    {
        List&lt;GrantedAuthority&gt; roles = new ArrayList&lt;GrantedAuthority&gt;();

        ConnectionType type = ConnectionHelper.getConnectionType(connection);

        String role = type.toString();

        roles.add(new SimpleGrantedAuthority(role));

        return roles;
    }
}