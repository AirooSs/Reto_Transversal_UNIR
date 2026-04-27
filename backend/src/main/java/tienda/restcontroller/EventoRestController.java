package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.entidades.Evento;
import tienda.service.EventoService;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoRestController {

	@Autowired
	EventoService eventoservice;

	@GetMapping("/")
	ResponseEntity<?> todos() {
		return ResponseEntity.ok(eventoservice.findAll());
	}

	@GetMapping("/{id}")
	ResponseEntity<?> uno(@PathVariable Long id) {
		return ResponseEntity.ok(eventoservice.findById(id));
	}

	@GetMapping("/destacados")
	ResponseEntity<?> destacados() {
		return ResponseEntity.ok(eventoservice.findDestacados());
	}

	@PostMapping("/")
	ResponseEntity<?> insertOne(@RequestBody Evento evento) {
		return ResponseEntity.ok(eventoservice.insertOne(evento));
	}

	@PutMapping("/")
	ResponseEntity<?> updateOne(@RequestBody Evento evento) {
		return ResponseEntity.ok(eventoservice.updateOne(evento));
	}

	@DeleteMapping("{id}")
	ResponseEntity<?> deleteOne(@PathVariable Long id) {
		eventoservice.deleteOne(id);
		return ResponseEntity.noContent().build();
	}
}
