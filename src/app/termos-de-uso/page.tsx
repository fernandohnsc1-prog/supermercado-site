import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function TermosDeUsoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-8">Termos de Uso</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 space-y-6 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar o site do Certo Atacado &amp; Varejo, você concorda com os presentes Termos de Uso. Caso não concorde, recomendamos que não utilize o site.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Uso do Site</h2>
              <p>O site do Certo Atacado &amp; Varejo tem como objetivo divulgar encartes, promoções, sorteios, informações sobre nossas lojas e serviços oferecidos. O conteúdo disponibilizado é meramente informativo e pode ser alterado sem aviso prévio.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Cadastro e Dados Pessoais</h2>
              <p>Para participar de sorteios e promoções, poderá ser solicitado o fornecimento de dados pessoais (nome, telefone, e-mail). Esses dados serão tratados conforme nossa Política de Privacidade e a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Propriedade Intelectual</h2>
              <p>Todo o conteúdo do site (textos, imagens, logotipos, marcas e layout) é de propriedade do Grupo Müller / Certo Atacado &amp; Varejo ou de seus parceiros, sendo vedada a reprodução sem autorização prévia.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Sorteios e Promoções</h2>
              <p>Os sorteios e promoções realizados pelo Certo Atacado &amp; Varejo possuem regulamentos próprios, disponíveis nas respectivas páginas. A participação implica na aceitação das regras específicas de cada ação.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Responsabilidades</h2>
              <p>O Certo Atacado &amp; Varejo não se responsabiliza por eventuais falhas técnicas, interrupções de acesso ao site, ou por danos decorrentes do uso das informações aqui disponibilizadas.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Alterações</h2>
              <p>Estes termos poderão ser atualizados a qualquer momento, sem aviso prévio. Recomendamos a consulta periódica desta página.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contato</h2>
              <p>Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo telefone (51) 9119-8639 ou pelo e-mail contato@certoatacado.com.br.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
