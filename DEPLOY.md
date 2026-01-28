# Instruções de Deploy no Vercel

## 1. Build Local (Concluído ✅)
O build foi realizado com sucesso. Os arquivos estáticos estão na pasta `dist/`.

## 2. Configuração de Variáveis de Ambiente
Antes do deploy, vá nas configurações do seu projeto no Vercel:
1. **Settings** > **Environment Variables**
2. Adicione a chave:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: (Sua chave sk-proj-...)
   - Selecione: Production, Preview, Development

> ⚠️ **Importante**: Sem essa chave, a transcrição falhará com erro 401/404 em produção, pois as funções serverless precisam dela.

## 3. Realizar Deploy

### Via CLI (Recomendado)
Execute no terminal:
```bash
vercel --prod
```

### Via GitHub
Faça push das alterações para o branch conectado ao Vercel.

## 4. Verificar API
Após o deploy, teste a transcrição na URL de produção.
Se houver erro, verifique os Logs em **Functions** no dashboard do Vercel.
