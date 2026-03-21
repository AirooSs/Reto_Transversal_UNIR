package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tienda.entidades.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
