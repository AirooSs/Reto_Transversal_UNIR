package tienda.service;

import tienda.entidades.Usuario;

import java.util.List;

public interface UsuarioService {

	List<Usuario> findAll();

	Usuario findById(Long id);

	Usuario findByEmail(String email);

	boolean existsByEmail(String email);

	Usuario insertOne(Usuario usuario);

	Usuario updateOne(Usuario usuario);

	int deleteOne(Long id);
}
