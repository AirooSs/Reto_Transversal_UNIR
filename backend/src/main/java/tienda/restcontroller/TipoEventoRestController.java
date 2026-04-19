package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tienda.entidades.TipoEvento;
import tienda.service.TipoEventoService;

@RestController
@RequestMapping("/tipoevento")
public class TipoEventoRestController {

	@Autowired
	private TipoEventoService tipoEventoService;

	@GetMapping("/")
	ResponseEntity<?> todos() {
		return ResponseEntity.ok(tipoEventoService.findAll());
	}

	@GetMapping("/{id}")
	ResponseEntity<?> uno(@PathVariable Long id) {
		return ResponseEntity.ok(tipoEventoService.findById(id));
	}

	@PostMapping("/")
	ResponseEntity<?> insertOne(@RequestBody TipoEvento tipoEvento) {
		return ResponseEntity.ok(tipoEventoService.insertOne(tipoEvento));
	}

	@PutMapping("/")
	ResponseEntity<?> updateOne(@RequestBody TipoEvento tipoEvento) {
		return ResponseEntity.ok(tipoEventoService.updateOne(tipoEvento));
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteOne(@PathVariable Long id) {
		tipoEventoService.deleteOne(id);
		return ResponseEntity.noContent().build();
	}
}