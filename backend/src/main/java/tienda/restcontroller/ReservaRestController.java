package tienda.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.service.ReservaService;

import java.util.Map;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaRestController {

	@Autowired
	private ReservaService reservaService;

	@GetMapping("/")
	public ResponseEntity<?> todas() {
		return ResponseEntity.ok(reservaService.findAll());
	}

	@GetMapping("/usuario/{usuarioId}/activas")
	public ResponseEntity<?> activasPorUsuario(@PathVariable Long usuarioId) {
		return ResponseEntity.ok(reservaService.findReservasActivasByUsuario(usuarioId));
	}

	@PostMapping("/crear")
	public ResponseEntity<?> crearReserva(@RequestBody Map<String, Object> body) {
		Long usuarioId = Long.valueOf(body.get("usuarioId").toString());
		Long eventoId = Long.valueOf(body.get("eventoId").toString());
		Integer cantidad = Integer.valueOf(body.get("cantidad").toString());

		Map<String, Object> resultado = reservaService.crearReserva(usuarioId, eventoId, cantidad);
		if ((boolean) resultado.get("ok")) return ResponseEntity.ok(resultado);
		return ResponseEntity.badRequest().body(resultado);
	}

	@DeleteMapping("/cancelar/{reservaId}/usuario/{usuarioId}")
	public ResponseEntity<?> cancelarReserva(@PathVariable Long reservaId, @PathVariable Long usuarioId) {
		int resultado = reservaService.cancelarReserva(reservaId, usuarioId);
		if (resultado == 0) return ResponseEntity.notFound().build();
		if (resultado == -1) return ResponseEntity.status(403).body(Map.of("mensaje", "No puedes cancelar una reserva que no es tuya."));
		return ResponseEntity.ok(Map.of("mensaje", "Reserva cancelada correctamente."));
	}
}
