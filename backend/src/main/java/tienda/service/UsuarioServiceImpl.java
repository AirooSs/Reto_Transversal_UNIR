package tienda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tienda.entidades.Usuario;
import tienda.repository.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario findById(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	@Override
	public Usuario findByEmail(String email) {
		return usuarioRepository.findByEmail(email).orElse(null);
	}

	@Override
	public boolean existsByEmail(String email) {
		return usuarioRepository.existsByEmail(email);
	}

	@Override
	public Usuario insertOne(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	@Override
	public Usuario updateOne(Usuario usuario) {
		if (usuarioRepository.existsById(usuario.getId()))
			return usuarioRepository.save(usuario);
		return null;
	}

	@Override
	public int deleteOne(Long id) {
		if (usuarioRepository.existsById(id)) {
			usuarioRepository.deleteById(id);
			return 1;
		}
		return 0;
	}
}
