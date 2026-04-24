package tienda.service;

import java.util.List;

import tienda.entidades.Usuario;

public interface UsuarioService {
	// CRUD BASICO

	List<Usuario> findAll();

	Usuario findById(Long id);

	Usuario insertOne(Usuario usuario);

	Usuario updateOne(Usuario usuario);

	int deleteOne(Long id);

	List<Usuario> findByRol(String rol);
}
