# Sistema de Autenticação - Sorteador Oilema

## 🔐 Acesso Protegido

O projeto agora possui um sistema de **autenticação por senha** para proteger o acesso ao sorteador.

### Senha Padrão
```
oilema123
```

## 📝 Como Usar

1. **Acesse a aplicação** em `http://localhost:3001/`
2. **Digite a senha**: `oilema123`
3. **Clique no botão "Acessar"**
4. Você terá acesso ao sorteador normalmente

### Para Fazer Logout
- Clique no botão **"Sair"** (ícone vermelho) no canto superior direito

## 🔐 Como Alterar a Senha

1. Abra o arquivo `src/config.ts`
2. Localize a linha com `export const PASSWORD = 'oilema123';`
3. Altere para sua senha desejada:
   ```typescript
   export const PASSWORD = 'sua-senha-segura-aqui';
   ```
4. Salve o arquivo - a alteração será refletida na próxima atualização

### Exemplos de Senhas Seguras
- `Sorteador@2026!`
- `Oilema#Segura123`
- `AcessoTI#admin2026`

## 🔑 Recursos de Segurança

- ✅ Sessão mantida durante a navegação (sessionStorage)
- ✅ Logout ao fechar a aba/navegador
- ✅ Interface de login com animações
- ✅ Validação de entrada

## 📁 Arquivos Relacionados

- `src/Login.tsx` - Componente de login
- `src/AppWithAuth.tsx` - Gerenciador de autenticação
- `src/config.ts` - Configuração da senha
- `src/main.tsx` - Ponto de entrada (modificado)
- `src/App.tsx` - Aplicação principal (modificada)
