# Lima & Prado — Revenue Solutions — MazyOS

> Sistema operacional de negócios da **Lima & Prado — Revenue Solutions**.
> Aqui ficam as regras de operação no Google Antigravity — leitura de contexto, aprendizado com correções,
> manutenção da memória e ciclo de vida de skills.

## O que é esse workspace

Operação da Lima & Prado — Revenue Solutions.
Aqui ficam todos os clientes, propostas, diagnósticos, conteúdo e entregas de sites, automações e IA.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual
- `identidade/` — marca da Lima & Prado (aplicada em tudo que é gerado)
- `clientes/` — uma subpasta por cliente, autossuficiente (com `GEMINI.md` local)
- `briefings/` — briefings e diagnósticos antes de fechar projeto
- `propostas/` — propostas comerciais em andamento
- `marketing/` — conteúdo institucional, SEO e campanhas da Lima & Prado
- `saidas/` — documentos pontuais, análises executivas
- `dados/` — arquivos a analisar (relatórios, exports de clientes)
- `scripts/` — utilitários (renderização, integrações)

---

## Sobre a Lima & Prado

A **Lima & Prado — Revenue Solutions** ajuda empresas no Brasil e no exterior a vender mais e trabalhar melhor usando sites de alta conversão, inteligência artificial e automações de processos.

Nossos serviços principais:
1. Desenvolvimento de Sites de Alta Conversão
2. Automação de Processos e Fluxos de Negócio
3. Soluções e Agentes de Inteligência Artificial
4. Consultoria e Diagnóstico de Receita

Operação liderada pela fundadora com planejamento de expansão para equipe conforme tração.

---

## Contexto do negócio

No início de toda conversa, ler:
1. `_memoria/empresa.md` — quem é a Lima & Prado, o que faz, serviços e equipe
2. `_memoria/preferencias.md` — tom de voz (humano, inteligente, seguro, consultivo e direto) e o que evitar
3. `_memoria/estrategia.md` — foco atual (aquisição, validação de ofertas, estruturação comercial e prospecção)

Pra qualquer tarefa visual (carrossel, post, landing page, proposta), consultar `identidade/design-guide.md` como referência obrigatória.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante em `.agents/skills/`. Se encontrar, seguir as instruções da skill. Se não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (especialmente rotinas de prospecção, qualificação ou propostas), perguntar:
> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

---

## Aprender com correções

Quando o usuário corrigir algo ou instruir de forma permanente ("prefiro assim", "não faça mais isso", "sempre que...", "evita..."), perguntar:
> "Quer que eu salve isso pra não precisar repetir?"

Se sim:
- Sobre o negócio → `_memoria/empresa.md`
- Sobre preferências e estilo → `_memoria/preferencias.md`
- Sobre prioridades e foco → `_memoria/estrategia.md`
- Regra de comportamento do workspace → próprio `GEMINI.md`

---

## Manter contexto atualizado

Ao concluir uma tarefa que mudou algo relevante (cliente novo, mudança de oferta, nova ferramenta), perguntar:
> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

---

## Regras da Agência

- Cliente novo → criar pasta `clientes/<Nome>/` via skill `/novo-projeto` com briefing e subpastas de entrega.
- Proposta nova → salvar em `propostas/<cliente>-<data>.html` (ou markdown) antes de fechar.
- Casos de sucesso → registrar em `clientes/<Nome>/caso.md` para reaproveitamento em propostas.
