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

import tienda.entidades.Reserva;
import tienda.service.ReservaService;

@RestController
@RequestMapping("/reserva")
public class ReservaRestController {

	@Autowired
	private ReservaService reservaService;

	@GetMapping("/")
	ResponseEntity<?> todos() {
		return ResponseEntity.ok(reservaService.findAll());
	}

	@GetMapping("/{id}")
	ResponseEntity<?> uno(@PathVariable Long id) {
		return ResponseEntity.ok(reservaService.findById(id));
	}

	@PostMapping("/")
	ResponseEntity<?> insertOne(@RequestBody Reserva reserva) {
		return ResponseEntity.ok(reservaService.insertOne(reserva));
	}

	@PutMapping("/")
	ResponseEntity<?> updateOne(@RequestBody Reserva reserva) {
		return ResponseEntity.ok(reservaService.updateOne(reserva));
	}

	@DeleteMapping("{id}")
	ResponseEntity<?> deleteOne(@PathVariable Long id) {
		reservaService.deleteOne(id);
		return ResponseEntity.noContent().build();
	}
}
