package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.entidades.Usuario;
import tienda.enums.Roles;
import tienda.service.UsuarioService;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioRestController {

	@Autowired
	private UsuarioService usuarioService;

	// GET /usuarios/ - todos (admin)
	@GetMapping("/")
	public ResponseEntity<?> todos() {
		return ResponseEntity.ok(usuarioService.findAll());
	}

	// GET /usuarios/{id}
	@GetMapping("/{id}")
	public ResponseEntity<?> uno(@PathVariable Long id) {
		Usuario usuario = usuarioService.findById(id);
		if (usuario == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(usuario);
	}

	// GET /usuarios/email/{email}
	@GetMapping("/email/{email}")
	public ResponseEntity<?> porEmail(@PathVariable String email) {
		Usuario usuario = usuarioService.findByEmail(email);
		if (usuario == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(usuario);
	}

	// GET /usuarios/rol/clientes
	@GetMapping("/rol/clientes")
	public ResponseEntity<?> clientes() {
		return ResponseEntity.ok(usuarioService.findByRol(Roles.CLIENTE));
	}

	// POST /usuarios/ - crear usuario (admin crea admins)
	@PostMapping("/")
	public ResponseEntity<?> insertOne(@RequestBody Usuario usuario) {
		if (usuarioService.existsByEmail(usuario.getEmail())) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(Map.of("mensaje", "Ya existe un usuario con ese email."));
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.insertOne(usuario));
	}

	// PUT /usuarios/ - editar usuario
	@PutMapping("/")
	public ResponseEntity<?> updateOne(@RequestBody Usuario usuario) {
		Usuario actualizado = usuarioService.updateOne(usuario);
		if (actualizado == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(actualizado);
	}

	// DELETE /usuarios/{id} - borrar usuario (admin)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOne(@PathVariable Long id) {
		int resultado = usuarioService.deleteOne(id);
		if (resultado == 0) return ResponseEntity.notFound().build();
		return ResponseEntity.noContent().build();
	}
}
