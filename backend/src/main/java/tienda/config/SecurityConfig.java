package tienda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import tienda.security.JwtAuthFilter;

@Configuration
public class SecurityConfig {

	private final JwtAuthFilter jwtAuthFilter;

	public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
		this.jwtAuthFilter = jwtAuthFilter;
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
			.csrf(csrf -> csrf.disable())
			.cors(cors -> {})
			.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(auth -> auth

				// CORS preflight
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

				// Auth: login y registro son públicos
				.requestMatchers("/auth/**").permitAll()

				// Invitados pueden ver eventos (GET)
				.requestMatchers(HttpMethod.GET, "/eventos/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/tipoevento/**").permitAll()
				
				// RECURSOS ESTÁTICOS (imágenes)
				.requestMatchers("/img/**").permitAll()
				.requestMatchers("/static/**").permitAll()

				// Solo ROLE_ADMON puede crear/editar/borrar eventos y tipos
				.requestMatchers(HttpMethod.POST, "/eventos/**").hasAuthority("ROLE_ADMON")
				.requestMatchers(HttpMethod.PUT, "/eventos/**").hasAuthority("ROLE_ADMON")
				.requestMatchers(HttpMethod.DELETE, "/eventos/**").hasAuthority("ROLE_ADMON")
				.requestMatchers(HttpMethod.POST, "/tipoevento/**").hasAuthority("ROLE_ADMON")
				.requestMatchers(HttpMethod.PUT, "/tipoevento/**").hasAuthority("ROLE_ADMON")
				.requestMatchers(HttpMethod.DELETE, "/tipoevento/**").hasAuthority("ROLE_ADMON")
				.requestMatchers("/usuario/**").hasAuthority("ROLE_ADMON")

				// Gestión de usuarios: solo ADMON
				.requestMatchers("/usuario/**").hasRole("ADMON")

				// Reservas: solo ROLE_CLIENTE y ROLE_ADMON
				.requestMatchers("/reserva/**").hasAnyAuthority("ROLE_CLIENTE", "ROLE_ADMON")
				// Todo lo demás requiere autenticación
				.anyRequest().authenticated()
			)
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}