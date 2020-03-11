package com.pesados.purplepoint.sociallogin;

import com.pesados.purplepoint.domini.User;
import com.pesados.purplepoint.util.UserHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.stereotype.Service;

@Service
public class SocialConnectionSignup implements ConnectionSignUp
{
    @Autowired
    UserHelper userHelper;

    @Override
    public String execute(Connection&lt;?&gt; connection)
    {
        User user = userHelper.getUser(connection);

        return user.getName();
    }
}