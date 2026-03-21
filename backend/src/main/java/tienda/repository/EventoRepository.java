package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tienda.entidades.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

}
