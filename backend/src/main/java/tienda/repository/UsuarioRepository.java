package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.entidades.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Usuario> findByRol(String rol);
}
