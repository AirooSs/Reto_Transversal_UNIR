package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tienda.entidades.Usuario;
import tienda.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioRestController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping("/")
	ResponseEntity<?> todos() {
		return ResponseEntity.ok(usuarioService.findAll());
	}

	@GetMapping("/{id}")
	ResponseEntity<?> uno(@PathVariable Long id) {
		return ResponseEntity.ok(usuarioService.findById(id));
	}

	@GetMapping("/rol/{rol}")
	ResponseEntity<?> porRol(@PathVariable String rol) {
		return ResponseEntity.ok(usuarioService.findByRol(rol));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertOne(@RequestBody Usuario usuario) {
		return ResponseEntity.ok(usuarioService.insertOne(usuario));
	}

	@PutMapping("/")
	ResponseEntity<?> updateOne(@RequestBody Usuario usuario) {
		return ResponseEntity.ok(usuarioService.updateOne(usuario));
	}

	@DeleteMapping("{id}")
	ResponseEntity<?> deleteOne(@PathVariable Long id) {
		usuarioService.deleteOne(id);
		return ResponseEntity.noContent().build();
	}

}
