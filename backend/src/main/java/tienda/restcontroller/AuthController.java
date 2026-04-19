package tienda.restcontroller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tienda.entidades.Usuario;
import tienda.repository.UsuarioRepository;
import tienda.security.JwtService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public AuthController(
			UsuarioRepository usuarioRepository,
			PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager,
			JwtService jwtService
	) {
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	@PostMapping("/registro")
	public ResponseEntity<?> registro(@RequestBody Usuario u) {

		if (u.getNombre() == null || u.getEmail() == null || u.getPassword() == null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Faltan campos obligatorios"));
		}

		if (usuarioRepository.existsByEmail(u.getEmail())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Email ya registrado"));
		}

		u.setId(null);
		u.setPassword(passwordEncoder.encode(u.getPassword()));

		// Rol por defecto al registrarse
		if (u.getRol() == null || u.getRol().isBlank()) {
			u.setRol("ROLE_CLIENTE");
		}

		Usuario saved = usuarioRepository.save(u);
		String token = jwtService.generateToken(saved.getEmail(), saved.getRol());

		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
				"token", token,
				"id", saved.getId(),
				"email", saved.getEmail(),
				"nombre", saved.getNombre(),
				"rol", saved.getRol()
		));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, Object> body) {

		String email = (String) body.get("email");
		String password = (String) body.get("password");

		if (email == null || password == null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Faltan email o password"));
		}

		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(email, password)
		);

		Usuario u = usuarioRepository.findByEmail(email).orElseThrow();
		String token = jwtService.generateToken(u.getEmail(), u.getRol());

		return ResponseEntity.ok(Map.of(
				"token", token,
				"id", u.getId(),
				"email", u.getEmail(),
				"nombre", u.getNombre(),
				"rol", u.getRol()
		));
	}
}
