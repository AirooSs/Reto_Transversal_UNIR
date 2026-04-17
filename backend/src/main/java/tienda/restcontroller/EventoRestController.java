package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.entidades.Evento;
import tienda.enums.EstadoEvento;
import tienda.service.EventoService;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoRestController {

	@Autowired
	EventoService eventoService;

	@GetMapping("/")
	public ResponseEntity<?> todos() {
		return ResponseEntity.ok(eventoService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> uno(@PathVariable Long id) {
		Evento evento = eventoService.findById(id);
		if (evento == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(evento);
	}

	@GetMapping("/activos")
	public ResponseEntity<?> activos() {
		return ResponseEntity.ok(eventoService.findByEstado(EstadoEvento.ACTIVO));
	}

	@GetMapping("/destacados")
	public ResponseEntity<?> destacados() {
		return ResponseEntity.ok(eventoService.findDestacados());
	}

	@PostMapping("/")
	public ResponseEntity<?> insertOne(@RequestBody Evento evento) {
		return ResponseEntity.status(HttpStatus.CREATED).body(eventoService.insertOne(evento));
	}

	@PutMapping("/")
	public ResponseEntity<?> updateOne(@RequestBody Evento evento) {
		Evento actualizado = eventoService.updateOne(evento);
		if (actualizado == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(actualizado);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOne(@PathVariable Long id) {
		if (eventoService.deleteOne(id) == 0) return ResponseEntity.notFound().build();
		return ResponseEntity.noContent().build();
	}
}
