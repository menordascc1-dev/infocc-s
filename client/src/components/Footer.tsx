export function Footer() {
  return (
    <footer className="w-full bg-[#0C326F] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 text-lg">Institucional</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Sobre o Portal</li>
              <li>Termos de Uso</li>
              <li>Política de Privacidade</li>
              <li>Segurança</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Serviços</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Regularização Fiscal</li>
              <li>Emissão de Guias</li>
              <li>Consultas Públicas</li>
              <li>Certidões</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Fale Conosco</li>
              <li>Perguntas Frequentes</li>
              <li>Ouvidoria</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-gray-400">
          <p>© 2026 Portal de Regularização Fiscal. Todos os direitos reservados.</p>
          <p className="mt-2">Este é um serviço de assessoria privada e possui vínculo direto com órgãos governamentais.</p>
        </div>
      </div>
    </footer>
  );
}
