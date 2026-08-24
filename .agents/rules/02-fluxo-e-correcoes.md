# Fluxo de Trabalho, Aprendizado e Atualizações

## Consulta Prévia de Skills
- Antes de iniciar qualquer tarefa, verificar se existe uma skill relevante em `.agents/skills/`.
- Se existir, seguir rigorosamente o passo a passo da skill.
- Ao concluir uma tarefa repetível sem skill existente, sugerir a criação de uma nova skill.

## Aprendizado com Correções
Quando o usuário fizer correções de padrão duradouro ("prefiro assim", "não faça mais isso", "sempre que...", "evita..."):
1. Perguntar: *"Quer que eu salve isso pra não precisar repetir?"*
2. Salvar cirurgicamente no arquivo correspondente:
   - Negócio/clientes/mercado → `_memoria/empresa.md`
   - Tom/estilo/regras de escrita → `_memoria/preferencias.md`
   - Prioridades/metas/foco → `_memoria/estrategia.md`
   - Regras de workspace → `GEMINI.md` / `CLAUDE.md`

## Manutenção de Contexto
Ao concluir tarefas com impacto estrutural (novo cliente, alteração de foco, nova skill):
1. Perguntar: *"Isso mudou algo no teu contexto. Quer que eu atualize a memória?"*
2. Mostrar claramente o que será adicionado ou alterado antes de salvar.
