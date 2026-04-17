package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.entidades.TipoEvento;
import tienda.service.TipoEventoService;

@RestController
@RequestMapping("/tipos-evento")
@CrossOrigin(origins = "http://localhost:4200")
public class TipoEventoRestController {

	@Autowired
	private TipoEventoService tipoEventoService;

	// GET /tipos-evento/ - todos
	@GetMapping("/")
	public ResponseEntity<?> todos() {
		return ResponseEntity.ok(tipoEventoService.findAll());
	}

	// GET /tipos-evento/{id} - uno
	@GetMapping("/{id}")
	public ResponseEntity<?> uno(@PathVariable Long id) {
		TipoEvento tipo = tipoEventoService.findById(id);
		if (tipo == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(tipo);
	}

	// POST /tipos-evento/ - crear (admin)
	@PostMapping("/")
	public ResponseEntity<?> insertOne(@RequestBody TipoEvento tipoEvento) {
		return ResponseEntity.status(HttpStatus.CREATED).body(tipoEventoService.insertOne(tipoEvento));
	}

	// PUT /tipos-evento/ - editar (admin)
	@PutMapping("/")
	public ResponseEntity<?> updateOne(@RequestBody TipoEvento tipoEvento) {
		TipoEvento actualizado = tipoEventoService.updateOne(tipoEvento);
		if (actualizado == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(actualizado);
	}

	// DELETE /tipos-evento/{id} - borrar (admin)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOne(@PathVariable Long id) {
		int resultado = tipoEventoService.deleteOne(id);
		if (resultado == 0) return ResponseEntity.notFound().build();
		return ResponseEntity.noContent().build();
	}
}
