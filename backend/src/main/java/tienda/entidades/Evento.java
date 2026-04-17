package tienda.entidades;

import jakarta.persistence.*;
import tienda.enums.EstadoEvento;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "eventos")
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

	@Column(name = "aforo_maximo")
	private Integer aforoMaximo;

	@Column(name = "plazas_disponibles")
	private Integer plazasDisponibles;

	@Column(name = "imagen_url")
	private String imagenUrl;

	private Boolean destacado = false;

	@Enumerated(EnumType.STRING)
	private EstadoEvento estado;

	@OneToMany(mappedBy = "evento")
	private List<Reserva> reservas;

	@ManyToOne
	@JoinColumn(name = "tipo_evento_id")
	private TipoEvento tipoEvento;

	public Evento() {
	}

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public String getTitulo() { return titulo; }
	public void setTitulo(String titulo) { this.titulo = titulo; }

	public String getDescripcion() { return descripcion; }
	public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

	public LocalDateTime getFecha() { return fecha; }
	public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

	public int getDuracion() { return duracion; }
	public void setDuracion(int duracion) { this.duracion = duracion; }

	public double getPrecio() { return precio; }
	public void setPrecio(double precio) { this.precio = precio; }

	public Integer getAforoMaximo() { return aforoMaximo; }
	public void setAforoMaximo(Integer aforoMaximo) { this.aforoMaximo = aforoMaximo; }

	public Integer getPlazasDisponibles() { return plazasDisponibles; }
	public void setPlazasDisponibles(Integer plazasDisponibles) { this.plazasDisponibles = plazasDisponibles; }

	public String getImagenUrl() { return imagenUrl; }
	public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

	public Boolean getDestacado() { return destacado; }
	public void setDestacado(Boolean destacado) { this.destacado = destacado != null ? destacado : false; }

	public EstadoEvento getEstado() { return estado; }
	public void setEstado(EstadoEvento estado) { this.estado = estado; }

	public List<Reserva> getReservas() { return reservas; }
	public void setReservas(List<Reserva> reservas) { this.reservas = reservas; }

	public TipoEvento getTipoEvento() { return tipoEvento; }
	public void setTipoEvento(TipoEvento tipoEvento) { this.tipoEvento = tipoEvento; }

	@Override
	public int hashCode() { return Objects.hash(id); }

	@Override
	public boolean equals(Object obj) {
		if (this == obj) return true;
		if (!(obj instanceof Evento)) return false;
		Evento other = (Evento) obj;
		return Objects.equals(id, other.id);
	}
}
