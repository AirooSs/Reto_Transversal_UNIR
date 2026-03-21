package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tienda.entidades.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}
