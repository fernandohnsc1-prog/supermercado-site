import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function PoliticaPrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-8">Política de Privacidade</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 space-y-6 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Introdução</h2>
              <p>O Certo Atacado &amp; Varejo, pertencente ao Grupo Müller, respeita a privacidade dos usuários de seu site e se compromete a proteger os dados pessoais coletados, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Dados Coletados</h2>
              <p>Coletamos os seguintes dados pessoais quando você interage com nosso site:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nome completo (ao participar de sorteios ou preencher formulários)</li>
                <li>Telefone/WhatsApp (para contato e participação em sorteios)</li>
                <li>E-mail (ao enviar mensagens pelo Fale Conosco)</li>
                <li>Currículo em PDF/Word (ao se candidatar pelo Trabalhe Conosco)</li>
                <li>Imagens/comprovantes (quando solicitados em sorteios)</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Finalidade do Tratamento</h2>
              <p>Os dados coletados são utilizados para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Realizar e gerenciar sorteios e promoções</li>
                <li>Responder a solicitações de contato</li>
                <li>Processar candidaturas de emprego</li>
                <li>Melhorar a experiência do usuário no site</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Compartilhamento de Dados</h2>
              <p>Seus dados pessoais não são vendidos ou compartilhados com terceiros, exceto quando necessário para o cumprimento de obrigações legais ou para prestadores de serviço essenciais (como plataformas de hospedagem e armazenamento).</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Armazenamento e Segurança</h2>
              <p>Os dados são armazenados em servidores seguros com criptografia e acesso restrito. Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou vazamento.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Direitos do Titular</h2>
              <p>Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar correção de dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Cookies</h2>
              <p>Utilizamos cookies essenciais para o funcionamento do site e para manter a sessão de administração. Não utilizamos cookies de rastreamento de terceiros.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contato</h2>
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Telefone: (51) 9119-8639</li>
                <li>E-mail: contato@certoatacado.com.br</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Alterações</h2>
              <p>Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
