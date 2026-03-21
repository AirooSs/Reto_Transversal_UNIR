package tienda.entidades;

import jakarta.persistence.*;
import lombok.*;
import tienda.enums.EstadoEvento;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String titulo;

	private String descripcion;

	private LocalDateTime fecha;

	private int duracion;

	private double precio;

	private Integer aforoMaximo;

	private Integer plazasDisponibles;

	@Enumerated(EnumType.STRING)

	private EstadoEvento estado;

	@OneToMany(mappedBy = "evento")
	private List<Reserva> reservas;

	@ManyToOne
	@JoinColumn(name = "tipo_evento_id")
	private TipoEvento tipoEvento;
}
