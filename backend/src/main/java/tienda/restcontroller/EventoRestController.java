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

import tienda.entidades.Evento;
import tienda.service.EventoService;

@RestController
@RequestMapping("/eventos") // 1. Cambiado a plural para que coincida con tu Angular
@CrossOrigin(origins = "http://localhost:4200")
public class EventoRestController {
	
	@Autowired EventoService eventoservice;
	
	@GetMapping("/")
	ResponseEntity<?> todos() {
		return ResponseEntity.ok(eventoservice.findAll());
	}

	@GetMapping("/{id}")
	ResponseEntity<?> uno(@PathVariable Long id) {
		return ResponseEntity.ok(eventoservice.findById(id));
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
