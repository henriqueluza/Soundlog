# PROJETO 2: Soundlog — Avalie, Descubra, Recomende 🎵⭐

**Dataset:** Million Song Dataset + Spotify API  
**Tipo:** Plataforma social de música inspirada no Letterboxd — avaliação de álbuns/músicas + recomendações inteligentes  
**PROJETO ESTRELA DO PORTFÓLIO**

---

## Visão Geral

O **Soundlog** é uma plataforma full-stack onde usuários podem avaliar músicas e álbuns (escala de 0.5 a 5 estrelas, estilo Letterboxd), escrever reviews, criar listas e receber recomendações personalizadas com base no seu histórico de avaliações. O projeto é **end-to-end**: do pipeline de dados até o deploy em Kubernetes com CI/CD automatizado.

---

## Stack Tecnológica

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS (design system próprio, dark mode por padrão)
- React Query (cache e sincronização de estado)
- Recharts (visualizações de áudio features)
- React Router

**Backend:**
- FastAPI (Python)
- MongoDB + Motor (driver assíncrono)
- Redis (cache de recomendações e sessões)
- JWT Auth (autenticação stateless)

**Machine Learning:**
- scikit-learn (content-based filtering)
- surprise (collaborative filtering — SVD, KNN)
- PyTorch (Neural Collaborative Filtering, Two-Tower)
- PySpark (processamento distribuído de interações em escala)
- MLflow (experiment tracking e model registry)

**Data & Integração:**
- Spotify API via spotipy (13 audio features reais)
- Apache Airflow (pipelines de ingestão e retreinamento)
- Elasticsearch (busca semântica)

**Infra & DevOps:**
- Docker + Docker Compose (desenvolvimento local)
- Kubernetes (produção — deployments, services, ingress, HPA)
- GitHub Actions (CI/CD)
- Prometheus + Grafana (monitoramento)
- Evidently AI (model drift)

---

## Estrutura do Projeto

```
soundlog/
├── frontend/                        # React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Design system (Button, Card, StarRating, etc.)
│   │   │   ├── AlbumCard.tsx
│   │   │   ├── SongCard.tsx
│   │   │   ├── ReviewModal.tsx
│   │   │   ├── RecommendationFeed.tsx
│   │   │   ├── AudioRadarChart.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Feed de atividade + recomendações
│   │   │   ├── AlbumPage.tsx        # Página do álbum (reviews, rating, tracklist)
│   │   │   ├── SongPage.tsx         # Página da música (reviews, audio features)
│   │   │   ├── Profile.tsx          # Perfil do usuário (estilo Letterboxd)
│   │   │   ├── Lists.tsx            # Listas curadas pelo usuário
│   │   │   ├── Search.tsx           # Busca semântica
│   │   │   └── Discover.tsx         # Explorar por gênero, mood, era
│   │   ├── hooks/
│   │   ├── services/                # Chamadas à API
│   │   └── store/
│   ├── tailwind.config.ts
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/                         # FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   ├── auth.py
│   │   │   │   ├── songs.py
│   │   │   │   ├── albums.py
│   │   │   │   ├── reviews.py
│   │   │   │   ├── ratings.py
│   │   │   │   ├── lists.py
│   │   │   │   ├── recommendations.py
│   │   │   │   └── search.py
│   │   ├── models/                  # Pydantic schemas
│   │   ├── db/
│   │   │   └── mongodb.py           # Motor async client
│   │   ├── cache/
│   │   │   └── redis.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── ml/                              # Modelos de recomendação
│   ├── recommenders/
│   │   ├── content_based.py
│   │   ├── collaborative.py        # SVD, KNN via surprise
│   │   ├── neural_cf.py            # NCF em PyTorch
│   │   ├── two_tower.py
│   │   └── hybrid.py
│   ├── features/
│   │   └── audio_features.py
│   ├── evaluation/
│   │   └── metrics.py
│   └── notebooks/
│       ├── 01_eda.ipynb
│       ├── 02_content_based.ipynb
│       ├── 03_collaborative.ipynb
│       ├── 04_deep_learning.ipynb
│       └── 05_evaluation.ipynb
│
├── data_pipeline/                   # Airflow DAGs
│   ├── dags/
│   │   ├── spotify_ingestion.py
│   │   ├── feature_engineering.py
│   │   ├── model_training.py
│   │   └── batch_recommendations.py
│   └── pyspark/
│       └── als_distributed.py
│
├── search/
│   └── elasticsearch_index.py
│
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── dashboards/
│   └── drift/
│       └── evidently_reports.py
│
├── k8s/                             # Kubernetes manifests
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── mongodb/
│   │   ├── statefulset.yaml
│   │   └── pvc.yaml
│   ├── redis/
│   │   └── deployment.yaml
│   ├── ingress.yaml
│   └── secrets.yaml
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Testes, lint, type check
│       └── cd.yml                   # Build, push Docker Hub, deploy K8s
│
├── docker-compose.yml               # Ambiente local completo
└── README.md
```

---

## Funcionalidades do App (Produto)

### Avaliação de Músicas e Álbuns
- Escala de **0.5 a 5 estrelas** (meia estrela, estilo Letterboxd)
- Reviews com texto, tags (mood, gênero, contexto) e spoiler tag
- "Ouvi em..." (data de escuta) — histórico temporal
- Marcar como favorito ♥ e adicionar a listas
- Contador de "Ouvintes" e média global de estrelas por música/álbum

### Perfil do Usuário
- Grid de álbuns avaliados recentemente
- Estatísticas: total de músicas ouvidas, média de rating, gênero favorito
- Atividade recente (feed de reviews e avaliações)
- Listas públicas curadas ("Top 10 Álbuns de 2024", "Para correr", etc.)
- Seguidores / Seguindo

### Feed Social
- Atividade de usuários que você segue
- Reviews em destaque
- "Populares esta semana" — músicas e álbuns mais avaliados

### Recomendações Personalizadas
- Seção "Para você" baseada nas suas avaliações (rating-weighted)
- "Porque você avaliou X com 5 estrelas..."
- Explorar por mood, energia, era (anos 70, 80, 90...)
- Cold-start: onboarding com seleção de artistas favoritos

### Busca
- Busca por música, álbum, artista
- Filtros: gênero, ano, BPM, energia, rating mínimo
- Busca semântica: "álbuns introspectivos para tarde chuvosa"

---

## Banco de Dados — MongoDB

MongoDB é uma escolha natural aqui: documentos flexíveis para reviews (que variam em estrutura), arrays de ratings embutidos nos documentos de música, e fácil modelagem de listas e feeds sociais.

**Coleções:**

```javascript
// users
{
  _id, username, email, password_hash, avatar_url,
  followers: [user_id], following: [user_id],
  favorite_genres: [], onboarding_complete: bool,
  created_at, updated_at
}

// songs
{
  _id, spotify_id, title, artist, album, year, genre, duration_ms,
  audio_features: { acousticness, danceability, energy, instrumentalness,
                    key, liveness, loudness, mode, speechiness, tempo,
                    time_signature, valence },
  cover_url, preview_url,
  avg_rating, rating_count,
  embedding: [float]  // vetor para busca semântica
}

// albums
{
  _id, spotify_id, title, artist, year, genre, cover_url,
  tracks: [song_id],
  avg_rating, rating_count
}

// ratings
{
  _id, user_id, item_id, item_type: "song"|"album",
  score: float,  // 0.5 a 5.0
  listened_at: date, created_at: date
}

// reviews
{
  _id, user_id, item_id, item_type, rating_id,
  text, tags: [], contains_spoiler: bool,
  likes: [user_id], created_at, updated_at
}

// lists
{
  _id, user_id, title, description, is_public: bool,
  items: [{ item_id, item_type, note, position }],
  created_at, updated_at
}

// activity (feed)
{
  _id, user_id, action_type: "rated"|"reviewed"|"listed"|"followed",
  payload: {}, created_at
}
```

**Índices relevantes:**
- `ratings`: índice composto `(user_id, item_id)` — unique
- `songs`: índice em `audio_features.energy`, `audio_features.valence` — filtros de discover
- `activity`: índice em `user_id + created_at` — feed cronológico
- Elasticsearch para busca semântica (embeddings + full-text)

---

## API REST — Endpoints Principais

```
# Auth
POST   /auth/register
POST   /auth/login
POST   /auth/refresh

# Músicas e Álbuns
GET    /songs/{id}
GET    /albums/{id}
GET    /artists/{id}/discography

# Avaliações
POST   /ratings                     # { item_id, item_type, score }
PUT    /ratings/{id}
DELETE /ratings/{id}
GET    /ratings/me                  # histórico do usuário

# Reviews
POST   /reviews
PUT    /reviews/{id}
DELETE /reviews/{id}
POST   /reviews/{id}/like
GET    /songs/{id}/reviews
GET    /albums/{id}/reviews

# Listas
POST   /lists
PUT    /lists/{id}
POST   /lists/{id}/items
DELETE /lists/{id}/items/{item_id}
GET    /users/{username}/lists

# Recomendações
GET    /recommendations/feed        # recomendações personalizadas
GET    /recommendations/similar/{item_id}
GET    /recommendations/discover    # explorar por parâmetros

# Busca
GET    /search?q=&type=&genre=&year=&min_rating=
GET    /search/semantic?q=          # busca por mood/contexto

# Social
GET    /feed                        # atividade de quem você segue
POST   /users/{username}/follow
DELETE /users/{username}/follow
GET    /users/{username}/profile
```

---

## Machine Learning — Modelos de Recomendação

Como os usuários têm **ratings explícitos** (0.5–5 estrelas), o sistema se beneficia de sinais muito mais ricos do que implicit feedback puro.

### Content-Based Filtering
- Features: audio features do Spotify + gênero + artista + ano
- TF-IDF para tags textuais de reviews
- Cosine similarity ponderada pelo rating do usuário para o item semente
- "Porque você amou X (5★): Y soa parecido"

### Collaborative Filtering (rating-based)
- User-item rating matrix (0.5 a 5.0)
- SVD e NMF via surprise — minimiza RMSE
- KNN user-based e item-based
- ALS distribuído com PySpark para escala

### Neural Collaborative Filtering (PyTorch)
- User Embedding + Item Embedding (128 dim)
- MLP que aprende interações não-lineares entre embeddings
- Input: (user_id, item_id, audio_features) → Output: rating estimado

### Two-Tower Model
- User Tower: [user_id, rating_history_avg_features] → Embedding (256)
- Item Tower: [item_id, audio_features, genre_embedding] → Embedding (256)
- Retrieval via approximate nearest neighbors (FAISS)
- Ranking final com cross-features

### Hybrid Router
- Fase 1 (cold-start): content-based puro — qualidade do onboarding
- Fase 2 (≥10 ratings): weighted blend (60% CF + 40% content)
- Fase 3 (≥50 ratings): Two-Tower model com reranking por diversidade

### Evaluation
- Train/test split temporal (evita data leakage)
- RMSE e MAE (qualidade do rating estimado)
- Precision@K, Recall@K, NDCG@K (K = 5, 10, 20)
- Coverage, Diversity (Shannon entropy de gêneros), Serendipity
- MLflow para tracking de todos os experimentos

---

## CI/CD — GitHub Actions

### ci.yml — Pull Requests e pushes para main
```yaml
# Etapas:
# 1. Lint: ESLint (frontend) + Ruff (backend)
# 2. Type check: tsc --noEmit (frontend) + mypy (backend)
# 3. Testes unitários: Vitest (frontend) + pytest (backend)
# 4. Testes de integração: pytest com MongoDB em memória (mongomock)
# 5. Build Docker (smoke test)
```

### cd.yml — Merge para main (deploy automático)
```yaml
# Etapas:
# 1. Build e tag das imagens Docker (SHA do commit como tag)
# 2. Push para Docker Hub (ou ECR/GCR)
# 3. Atualiza manifests do Kubernetes com a nova tag (Kustomize)
# 4. kubectl apply nos manifests
# 5. Verifica rollout: kubectl rollout status
# 6. Smoke test de health check no endpoint de produção
# 7. Notificação de sucesso/falha (Slack webhook)
```

**Ambientes:** `dev` (branch develop, cluster de staging) → `prod` (branch main, cluster de produção)

---

## Kubernetes — Produção

```yaml
# Componentes deployados:
# - frontend:       Deployment (React build via Nginx) + HPA (2–10 replicas)
# - backend:        Deployment (FastAPI via Uvicorn) + HPA (2–8 replicas)
# - mongodb:        StatefulSet com PersistentVolumeClaim
# - redis:          Deployment (cache de sessão e recomendações)
# - elasticsearch:  StatefulSet (busca semântica)
# - airflow:        Deployment (scheduler + webserver)
# - Ingress:        NGINX Ingress Controller com TLS via cert-manager
```

Horizontal Pod Autoscaler configurado por CPU (>70%) e memória (>80%) — backend e frontend escalam automaticamente sob carga. Rolling updates garantem zero-downtime nos deploys.

---

## Monitoramento

**Prometheus + Grafana:**
- Latência das rotas FastAPI (p50, p95, p99)
- Taxa de erros HTTP (4xx, 5xx)
- Cache hit rate do Redis
- Throughput de requests/s

**Alertas:**
- Model drift detectado via Evidently AI (distribuição de ratings muda)
- p95 de latência > 200ms
- Error rate > 1%
- MongoDB disk usage > 80%

---

## Checklist de Desenvolvimento

### ⚙️ Setup & Infra
- [ ] Repositório com monorepo structure
- [ ] Docker Compose funcional (`docker compose up` sobe tudo)
- [ ] Kubernetes manifests — namespace, deployments, services, ingress
- [ ] Secrets gerenciados com Kubernetes Secrets
- [ ] Pipeline CI configurado (lint + type check + testes + build)
- [ ] Pipeline CD configurado (build → push → deploy → smoke test)
- [ ] Domínio + TLS com cert-manager

### 🗄️ Banco de Dados & Dados
- [ ] MongoDB configurado (Atlas cloud ou StatefulSet no K8s)
- [ ] Índices criados e validados com explain()
- [ ] Ingestão inicial via Spotify API (músicas + audio features)
- [ ] Pipeline Airflow para ingestão diária de novas músicas
- [ ] Elasticsearch indexado com embeddings das músicas

### 🔌 Backend (FastAPI)
- [ ] Auth com JWT (register, login, refresh token)
- [ ] CRUD de ratings (0.5–5.0, por música e por álbum)
- [ ] CRUD de reviews (texto, tags, spoiler flag, likes)
- [ ] CRUD de listas (públicas e privadas)
- [ ] Sistema de follow/unfollow + feed de atividade
- [ ] Endpoints de recomendações (content, CF, hybrid, neural)
- [ ] Busca full-text e semântica (Elasticsearch)
- [ ] Cache com Redis (recomendações, sessões, popular items)
- [ ] Rate limiting nas rotas públicas
- [ ] Testes unitários e de integração (pytest, >80% coverage)

### 🤖 Machine Learning
- [ ] EDA completo (distribuição de ratings, long tail, gêneros)
- [ ] Content-based filtering funcional
- [ ] Collaborative filtering com surprise (SVD + KNN)
- [ ] ALS distribuído com PySpark
- [ ] Neural CF em PyTorch treinado e serializado
- [ ] Two-Tower model com FAISS para retrieval
- [ ] Hybrid router (cold-start → CF → neural por volume de ratings)
- [ ] Evaluation pipeline com todas as métricas
- [ ] MLflow: todos os experimentos rastreados
- [ ] Airflow DAG de retreinamento semanal automatizado

### 🎨 Frontend (React + Tailwind)
- [ ] Design system: paleta escura, componente StarRating (0.5 step), Card, Modal, Badge
- [ ] Página de álbum: tracklist, média de estrelas, reviews, radar chart de audio features
- [ ] Página de música: player preview (Spotify), audio features, reviews
- [ ] Página de perfil: grid de álbuns, stats, feed de atividade, listas
- [ ] Feed principal: atividade social + "Para você"
- [ ] Tela de busca com filtros (gênero, energia, ano, rating mínimo)
- [ ] Tela Discover: explorar por mood/contexto/era
- [ ] Onboarding: seleção de artistas favoritos (cold-start)
- [ ] Responsivo (mobile-first)
- [ ] Testes com Vitest + Testing Library

### 📊 Monitoramento & Observabilidade
- [ ] Prometheus scraping métricas do backend
- [ ] Dashboard Grafana (latência, erros, cache hit rate)
- [ ] Alertas configurados (latência, erros, drift)
- [ ] Evidently AI report de model drift agendado no Airflow
- [ ] Logs estruturados (JSON) centralizados

---

## Métricas de Sucesso

**Produto:** app funcional com avaliação de músicas e álbuns ponta a ponta, recomendações personalizadas visíveis e explicáveis no frontend, busca semântica retornando resultados relevantes.

**ML:** RMSE < 0.8 no rating prediction, NDCG@10 > 0.45 no Two-Tower / Hybrid, cold-start funcional a partir do onboarding.

**Infra:** CI completo rodando em < 5 minutos, CD com deploy automático em < 10 minutos após merge, API com latência p95 < 100ms, cache hit rate > 65%, zero-downtime deploy via rolling update no K8s.

---

## Skills Desenvolvidas

**Produto & Design:** UX inspirado em Letterboxd, design system dark mode, componentes React reutilizáveis com Tailwind

**Backend:** FastAPI assíncrono, modelagem de documentos MongoDB, caching estratégico com Redis, auth JWT

**ML:** Rating-based collaborative filtering, Neural CF, Two-Tower retrieval, hybrid routing, MLflow experiment tracking

**Data Engineering:** Airflow DAGs, Spotify API, PySpark ALS, Elasticsearch embeddings

**DevOps:** Docker multi-stage builds, Kubernetes (HPA, StatefulSet, Ingress, Secrets), GitHub Actions CI/CD, Prometheus/Grafana

---

## Por que este é o PROJETO ESTRELA?

1. **Produto real e demonstrável:** "É o Letterboxd para músicas" — qualquer recrutador entende a proposta em segundos
2. **Full-stack end-to-end:** React + FastAPI + MongoDB + ML + K8s, tudo integrado
3. **DevOps moderno:** CI/CD + Kubernetes é diferencial enorme em portfólios júnior/pleno
4. **ML rico:** ratings explícitos permitem modelos mais sofisticados e métricas mais claras do que implicit feedback
5. **Complexidade real:** social graph, cold-start, busca semântica, model drift — problemas que empresas enfrentam de verdade
6. **Diferencial:** quase nenhum portfólio tem recsys + social features + K8s + CI/CD juntos
