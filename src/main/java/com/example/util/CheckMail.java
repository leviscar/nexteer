package com.example.util;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.util.Hashtable;

/**
 * Created by mrpan on 2017/4/8.
 * login method using AD domain
 */
public class CheckMail {
    /**
     * 检测用户是否有权限登录
     *
     * @param userName
     * @param password
     * @return
     */
    public static boolean checkMail(String userName, String password) {
        if (userName.equals("") || password.equals("")) {
            return false;
        }
        String host = "10.1.0.6";
        String port = "389";
        String domain = "CQ-Nexteer.com";
        String url = "ldap://" + host + ":" + port;
        String user = userName + "@" + domain;
        Hashtable env = new Hashtable();
        InitialContext ctx;
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, user);
        env.put(Context.SECURITY_CREDENTIALS, password);
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url);
        try {
            ctx = new InitialContext(env);
            ctx.close();
            return true; //验证成功返回true
        } catch (NamingException err) {
            return false;//验证失败返回false
        }
    }
}
