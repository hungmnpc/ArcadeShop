package com.monopoco.arcade.security;

import com.monopoco.arcade.filter.CustomerAuthenticationFilter;
import com.monopoco.arcade.filter.CustomerAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        auth.inMemoryAuthentication()
                .withUser("hung")
                .password(passwordEncoder.encode("hung"))
                .authorities("ADMIN");

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            var cors = new CorsConfiguration();
            cors.setAllowedOrigins(List.of("http://localhost:3000",
                    "https://arcadezz.netlify.app",
                    "https://www.youtube.com"));

            cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            cors.setAllowedHeaders(List.of("*"));
            cors.setAllowCredentials(true);
            return cors;
        }).and();
        http.csrf().disable();
//        http.formLogin().loginProcessingUrl("/api/v1/auth/login") ;
        http.exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed"));
        http.authorizeHttpRequests().antMatchers("/api/v1/auth/**").permitAll();
        http.authorizeHttpRequests().antMatchers("/login/**").permitAll();


        http.authorizeHttpRequests().antMatchers("/h2-console/**").permitAll();
        http.authorizeHttpRequests().antMatchers(GET, "/api/users/**").hasAnyAuthority("ROLE_USER" +
                "");
//        http.authorizeHttpRequests().antMatchers(GET, "/api/users/**").permitAll();
        http.authorizeHttpRequests().antMatchers(POST, "/api/products/**").permitAll();
        http.authorizeHttpRequests().antMatchers(GET, "/api/products/**").permitAll();
        http.authorizeHttpRequests().antMatchers(POST, "/api/v1/admin/products/**").permitAll();

        http.authorizeHttpRequests().antMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll();
        http.authorizeHttpRequests().anyRequest().authenticated();

        CustomerAuthenticationFilter customerAuthenticationFilter = new CustomerAuthenticationFilter(authenticationManagerBean());
        customerAuthenticationFilter.setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/login", "POST"));
        http.addFilter(customerAuthenticationFilter);
        http.addFilterBefore(new CustomerAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
