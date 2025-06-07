
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Mic,
  Send,
  Bot,
  User,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: "ai",
      message: "Olá! Sou seu assistente CloseAI. Posso ajudar com vendas, negociação, estratégias comerciais, desenvolvimento pessoal e muito mais. Como posso ajudá-lo hoje?",
      time: "14:30"
    }
  ]);

  const quickActions = [
    "Como quebrar objeção de preço?",
    "Estratégias de prospecção",
    "Técnicas de fechamento",
    "Desenvolvimento de equipe",
    "Análise de mercado",
    "Motivação pessoal"
  ];

  const insights = [
    { label: "Taxa de Conversão", value: "78%", icon: Target, color: "sales-success" },
    { label: "Tempo Médio", value: "12min", icon: Clock, color: "sales-primary" },
    { label: "Vendas Hoje", value: "5", icon: TrendingUp, color: "sales-accent" }
  ];

  // Sistema de respostas inteligentes expandido
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // === VENDAS E NEGOCIAÇÃO ===
    
    // Objeções de preço
    if (message.includes("preço") || message.includes("caro") || message.includes("barato") || message.includes("desconto")) {
      return "💰 **Estratégias para Objeções de Preço:**\n\n1. **Reconheça e valide**: 'Entendo sua preocupação com o investimento'\n2. **Reframe o valor**: 'Vamos pensar no retorno que isso trará'\n3. **Quebre em partes**: 'São apenas R$ X por dia para resolver Y'\n4. **Compare custos**: 'O custo de não resolver é maior'\n5. **Ofereça opções**: Apresente diferentes formas de pagamento\n6. **Crie urgência**: 'Esta condição especial é válida até...'\n\n💡 **Lembre-se**: Preço só é objeção quando não há valor percebido!\n\n🎯 **Script**: 'Além do preço, existe mais alguma preocupação que eu posso esclarecer?'";
    }
    
    // Prospecção
    if (message.includes("prospecção") || message.includes("prospect") || message.includes("lead") || message.includes("contato")) {
      return "🎯 **Estratégias de Prospecção Eficazes:**\n\n**1. Pesquisa Prévia:**\n• LinkedIn da empresa e decisores\n• Notícias recentes do setor\n• Dores comuns do segmento\n\n**2. Múltiplos Canais:**\n• E-mail personalizado\n• LinkedIn com valor\n• Telefone estratégico\n• Redes sociais\n\n**3. Sequência de Follow-up:**\n• 1º contato: Insight relevante\n• 2º contato: Case de sucesso\n• 3º contato: Pergunta provocativa\n• 4º contato: Oferta específica\n\n**4. Scripts Eficazes:**\n• 'Notei que vocês estão [situação]. Ajudei empresas similares a [resultado]'\n• 'Você tem 30 segundos para uma ideia que pode [benefício]?'\n\n📞 **Dica**: Sempre termine com uma pergunta!";
    }
    
    // Fechamento
    if (message.includes("fechar") || message.includes("finalizar") || message.includes("venda") || message.includes("close")) {
      return "🎯 **Técnicas de Fechamento Poderosas:**\n\n**1. Fechamento Assumido**\n• 'Quando você gostaria de começar?'\n• 'Qual forma de pagamento prefere?'\n\n**2. Fechamento por Escolha**\n• 'Você prefere a opção A ou B?'\n• 'Implementamos na segunda ou terça?'\n\n**3. Fechamento de Urgência**\n• 'Temos apenas 2 vagas este mês'\n• 'Esta condição expira amanhã'\n\n**4. Fechamento de Benefício**\n• 'Com isso você conseguirá [resultado específico]'\n\n**5. Fechamento de Teste**\n• 'Se eu conseguir [resolver X], você fecha hoje?'\n\n✅ **Sinais de Compra:**\n• Perguntas técnicas/detalhadas\n• Menciona implementação\n• Pergunta sobre prazos\n• Envolve outras pessoas";
    }
    
    // === GESTÃO E LIDERANÇA ===
    
    if (message.includes("gestão") || message.includes("gerenciar") || message.includes("líder") || message.includes("liderança") || message.includes("equipe")) {
      return "👨‍💼 **Princípios de Liderança em Vendas:**\n\n**1. Comunicação Eficaz:**\n• Reuniões de alinhamento semanais\n• Feedback construtivo regular\n• Metas claras e mensuráveis\n\n**2. Motivação da Equipe:**\n• Reconhecimento público dos resultados\n• Plano de carreira definido\n• Comissões atrativas e justas\n\n**3. Desenvolvimento:**\n• Treinamentos regulares\n• Mentoria individual\n• Compartilhamento de best practices\n\n**4. Acompanhamento:**\n• Dashboard de performance\n• 1:1 semanal com cada vendedor\n• Análise de pipeline conjunto\n\n**5. Cultura de Resultados:**\n• Celebração de conquistas\n• Aprendizado com fracassos\n• Ambiente colaborativo\n\n🎯 **Dica**: Um bom líder cria outros líderes!";
    }
    
    // === DESENVOLVIMENTO PESSOAL ===
    
    if (message.includes("motivação") || message.includes("motivado") || message.includes("desmotivado") || message.includes("ânimo")) {
      return "🚀 **Estratégias de Motivação:**\n\n**1. Definição de Propósito:**\n• Por que você vende?\n• Qual seu 'why' profundo?\n• Como suas vendas impactam vidas?\n\n**2. Metas SMART:**\n• Específicas e mensuráveis\n• Prazo definido\n• Quebradas em micro-objetivos\n\n**3. Rotina de Sucesso:**\n• Manhã produtiva\n• Exercícios físicos\n• Leitura/podcasts\n• Networking ativo\n\n**4. Mindset Vencedor:**\n• Foco em soluções, não problemas\n• Aprendizado contínuo\n• Resiliência diante do 'não'\n\n**5. Celebração:**\n• Comemore pequenas vitórias\n• Recompense-se pelos resultados\n• Compartilhe sucessos\n\n💡 **Lembre-se**: Motivação é como banho - precisa ser diária!";
    }
    
    // === ANÁLISE E ESTRATÉGIA ===
    
    if (message.includes("mercado") || message.includes("concorrência") || message.includes("estratégia") || message.includes("planejamento")) {
      return "📊 **Análise Estratégica de Mercado:**\n\n**1. Análise SWOT:**\n• **Forças**: O que fazemos melhor?\n• **Fraquezas**: Onde podemos melhorar?\n• **Oportunidades**: Que gaps existem?\n• **Ameaças**: Quais são os riscos?\n\n**2. Pesquisa de Concorrência:**\n• Preços e propostas de valor\n• Pontos fortes e fracos\n• Estratégias de marketing\n• Feedback de clientes\n\n**3. Segmentação de Mercado:**\n• Perfil do cliente ideal (ICP)\n• Jornada do cliente\n• Dores e necessidades\n• Canais de comunicação\n\n**4. Posicionamento:**\n• Diferencial competitivo único\n• Proposta de valor clara\n• Messaging consistente\n\n**5. Plano de Ação:**\n• Objetivos trimestrais\n• Táticas específicas\n• Métricas de acompanhamento\n• Budget e recursos\n\n🎯 **Dica**: Estratégia sem execução é apenas planejamento!";
    }
    
    // === PERFIS COMPORTAMENTAIS ===
    
    if (message.includes("perfil") || message.includes("comportamento") || message.includes("cliente") || message.includes("disc")) {
      return "🔍 **Identificação de Perfis Comportamentais (DISC):**\n\n🔴 **DOMINANTE (D)**\n• **Características**: Direto, objetivo, resultados rápidos\n• **Abordagem**: Seja assertivo, foque ROI, apresente fatos\n• **Evite**: Detalhes excessivos, relacionamento pessoal\n\n🟡 **INFLUENCIADOR (I)**\n• **Características**: Comunicativo, social, emotivo\n• **Abordagem**: Use storytelling, mostre reconhecimento\n• **Evite**: Dados frios, pressão excessiva\n\n🟢 **ESTÁVEL (S)**\n• **Características**: Cauteloso, leal, precisa confiança\n• **Abordagem**: Construa relacionamento, dê garantias\n• **Evite**: Mudanças bruscas, pressão por tempo\n\n🔵 **CONSCIENTE (C)**\n• **Características**: Analítico, detalhista, precisa dados\n• **Abordagem**: Apresente fatos, seja técnico, dê tempo\n• **Evite**: Promessas vagas, pressão emocional\n\n💡 **Como identificar**: Observe linguagem corporal, tom de voz, perguntas feitas e velocidade de decisão.";
    }
    
    // === TECNOLOGIA E INOVAÇÃO ===
    
    if (message.includes("tecnologia") || message.includes("digital") || message.includes("automação") || message.includes("crm") || message.includes("ia")) {
      return "💻 **Tecnologia em Vendas:**\n\n**1. CRM Eficiente:**\n• Histórico completo do cliente\n• Pipeline visual organizado\n• Automação de follow-ups\n• Relatórios de performance\n\n**2. Ferramentas de Prospecção:**\n• LinkedIn Sales Navigator\n• Ferramentas de email finder\n• Sequências automatizadas\n• Social selling\n\n**3. Inteligência Artificial:**\n• Análise de sentimento\n• Previsão de vendas\n• Chatbots qualificadores\n• Personalização em escala\n\n**4. Métricas Importantes:**\n• Taxa de conversão por etapa\n• Tempo médio de ciclo\n• Valor médio do ticket\n• CAC vs LTV\n\n**5. Tendências Futuras:**\n• Vendas conversacionais\n• Video selling\n• Realidade virtual/aumentada\n• Análise preditiva\n\n🚀 **Dica**: Tecnologia potencializa, mas não substitui o relacionamento humano!";
    }
    
    // === OBJEÇÕES GERAIS ===
    
    if (message.includes("objeção") || message.includes("não") || message.includes("dúvida") || message.includes("resistência")) {
      return "🛡️ **Técnica Universal para Objeções:**\n\n**1. OUCA** (Método Comprovado):\n• **O**uça completamente\n• **U**nderstand (entenda a real preocupação)\n• **C**onfirme a objeção\n• **A**presente a solução\n\n**2. Principais Objeções:**\n• **Preço**: Foque no valor e ROI\n• **Tempo**: Mostre urgência e oportunidade\n• **Autoridade**: Identifique o decisor real\n• **Necessidade**: Reforce a dor\n• **Confiança**: Use prova social\n\n**3. Frases Poderosas:**\n• 'Entendo sua preocupação...'\n• 'Além disso, existe mais alguma coisa?'\n• 'Se eu conseguir resolver isso...'\n• 'O que precisa acontecer para...?'\n\n**4. Tratamento Emocional:**\n• Mantenha calma e empatia\n• Não argumente, questione\n• Use tom consultivo\n• Transforme objeção em oportunidade\n\n💡 **Lembre-se**: Objeção é interesse disfarçado!";
    }
    
    // === NETWORKING E RELACIONAMENTO ===
    
    if (message.includes("networking") || message.includes("relacionamento") || message.includes("rapport") || message.includes("conexão")) {
      return "🤝 **Construção de Relacionamentos:**\n\n**1. Networking Estratégico:**\n• Eventos do setor\n• LinkedIn ativo e engajado\n• Grupos e comunidades\n• Referências e indicações\n\n**2. Construção de Rapport:**\n• Espelhamento sutil\n• Interesses em comum\n• Escuta ativa genuína\n• Linguagem corporal positiva\n\n**3. Manutenção de Relacionamentos:**\n• Check-ins regulares sem venda\n• Compartilhamento de valor\n• Lembrar de datas importantes\n• Apresentação de contatos\n\n**4. Follow-up Inteligente:**\n• Adicione valor a cada contato\n• Seja consistente, não insistente\n• Use múltiplos canais\n• Personalize cada mensagem\n\n**5. Long-term Thinking:**\n• Pense em relacionamento, não transação\n• Seja genuinamente útil\n• Construa reputação sólida\n• Cultive promotores da marca\n\n🌟 **Dica**: Relacionamentos são construídos antes de serem precisos!";
    }
    
    // === APRESENTAÇÕES E DEMOS ===
    
    if (message.includes("apresentação") || message.includes("demo") || message.includes("proposta") || message.includes("pitch")) {
      return "🎤 **Apresentações Impactantes:**\n\n**1. Estrutura SPIN:**\n• **S**ituação atual do cliente\n• **P**roblemas identificados\n• **I**mplicações das dores\n• **N**ecessidades específicas\n\n**2. Storytelling Eficaz:**\n• Comece com um case similar\n• Use dados concretos\n• Crie conexão emocional\n• Termine com call-to-action\n\n**3. Demo Personalizada:**\n• Foque nos features que importam\n• Use dados/exemplos do cliente\n• Interaja, não apenas mostre\n• Confirme entendimento constantemente\n\n**4. Proposta Vencedora:**\n• ROI claro e mensurável\n• Timeline realista\n• Próximos passos definidos\n• Termos e condições claros\n\n**5. Handling de Perguntas:**\n• Antecipe possíveis dúvidas\n• Responda com confiança\n• Use perguntas para qualificar\n• Termine sempre confirmando\n\n🎯 **Regra de Ouro**: Fale 30%, escute 70%!";
    }
    
    // === PSICOLOGIA DE VENDAS ===
    
    if (message.includes("psicologia") || message.includes("mental") || message.includes("mindset") || message.includes("persuasão")) {
      return "🧠 **Psicologia Aplicada às Vendas:**\n\n**1. Princípios de Cialdini:**\n• **Reciprocidade**: Dê primeiro\n• **Compromisso**: Obtenha confirmações\n• **Prova Social**: Use cases e depoimentos\n• **Autoridade**: Demonstre expertise\n• **Simpatia**: Construa afinidade\n• **Escassez**: Crie senso de urgência\n\n**2. Gatilhos Mentais:**\n• Urgência e escassez\n• Autoridade e expertise\n• Prova social e consenso\n• Novidade e curiosidade\n• Benefício e transformação\n\n**3. Neurovendas:**\n• Cérebro reptiliano busca segurança\n• Límbico busca emoção\n• Neocórtex busca lógica\n• Balance os três cérebros\n\n**4. Técnicas de Influência:**\n• Ancoragem de preços\n• Contraste de opções\n• Efeito enquadramento\n• Aversão à perda\n\n**5. Mindset Vencedor:**\n• Reframe do 'não' como 'ainda não'\n• Foco em valor, não venda\n• Mentalidade de consultor\n• Persistência inteligente\n\n💡 **Lembre-se**: Pessoas compram emocionalmente e justificam logicamente!";
    }
    
    // === RESPOSTA GENÉRICA INTELIGENTE ===
    
    // Análise de contexto para resposta personalizada
    if (message.includes("como") || message.includes("o que") || message.includes("quando") || message.includes("onde") || message.includes("por que")) {
      return "🤔 **Vou ajudar você com essa questão!**\n\nPara dar uma resposta mais específica e útil, me conte:\n\n1. **Contexto**: Em que situação você está?\n2. **Objetivo**: O que você quer alcançar?\n3. **Desafio**: Qual a principal dificuldade?\n4. **Prazo**: Quando precisa resolver?\n\n💡 **Enquanto isso, algumas dicas gerais:**\n• Comece sempre pelo 'porquê'\n• Foque na dor do cliente\n• Use dados para fundamentar\n• Teste e meça resultados\n• Seja persistente, mas inteligente\n\n📚 **Áreas que posso ajudar:**\n• Estratégias de vendas\n• Técnicas de negociação\n• Desenvolvimento pessoal\n• Gestão de equipes\n• Análise de mercado\n• Psicologia aplicada\n\n🎯 Pode ser mais específico sobre sua situação?";
    }
    
    // Resposta padrão melhorada
    return "🎯 **Analisando sua questão...**\n\nCom base na minha experiência em vendas e negócios, aqui estão algumas diretrizes:\n\n**1. Identifique o Core da Questão**\n• Qual é o real problema a resolver?\n• Quem são os stakeholders envolvidos?\n• Qual o impacto de não resolver?\n\n**2. Abordagem Estruturada**\n• Gather: Colete todas as informações\n• Analyze: Analise os dados objetivamente\n• Strategize: Desenvolva opções de solução\n• Execute: Implemente com foco em resultados\n\n**3. Princípios Universais**\n• Foque em valor, não em features\n• Escute mais do que fale\n• Seja genuinamente útil\n• Construa relacionamentos duradouros\n• Meça e otimize constantemente\n\n💬 **Para uma resposta mais específica**, me conte:\n• Contexto da situação\n• Objetivo desejado\n• Principais desafios\n• Recursos disponíveis\n\n🚀 **Lembre-se**: Todo problema tem solução, é questão de encontrar a abordagem certa!";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newConversation = [
      ...conversation,
      {
        type: "user",
        message: message,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setConversation(newConversation);
    const userMessage = message;
    setMessage("");
    
    // Gera resposta inteligente baseada na pergunta
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage);
      setConversation(prev => [
        ...prev,
        {
          type: "ai",
          message: aiResponse,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        {/* Header */}
        <div className="px-4 mb-6">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
              🤖 CloseAI Assistant
            </Badge>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              Assistente Inteligente
            </h1>
            <p className="text-muted-foreground text-sm">
              Seu consultor pessoal para vendas, negócios e desenvolvimento
            </p>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="card-glass">
                  <CardContent className="p-3 text-center">
                    <IconComponent className={`h-4 w-4 mx-auto mb-1 text-${insight.color}`} />
                    <div className="text-lg font-bold gradient-text">{insight.value}</div>
                    <div className="text-xs text-muted-foreground">{insight.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 px-4">
          <Card className="card-glass h-96 flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-sales-secondary" />
                Chat Inteligente
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {conversation.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' 
                        ? 'bg-sales-primary' 
                        : 'bg-sales-secondary'
                    }`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      msg.type === 'user'
                        ? 'bg-sales-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="px-4 my-6">
          <h3 className="text-sm font-semibold mb-3">Tópicos Populares</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs glass-effect h-auto py-2 px-3"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4">
          <Card className="card-glass">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Faça qualquer pergunta sobre vendas, negócios, estratégia..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className={`glass-effect ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={() => setIsListening(!isListening)}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="btn-gradient"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Assistant;
