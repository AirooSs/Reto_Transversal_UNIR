package tienda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda.entidades.Usuario;
import tienda.repository.UsuarioRepository;

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
	public Usuario insertOne(Usuario usuario) {

		return usuarioRepository.save(usuario);
	}

	@Override
	public Usuario updateOne(Usuario usuario) {

		if (usuarioRepository.existsById(usuario.getId()))
			return usuarioRepository.save(usuario);
		else
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

	@Override
    public List<Usuario> findByRol(String rol) { // <-- nuevo
        return usuarioRepository.findByRol(rol);
    }
}
