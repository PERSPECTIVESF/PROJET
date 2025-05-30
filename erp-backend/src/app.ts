import express from 'express';
import cors from 'cors';
import utilisateurRoutes from './routes/utilisateur.routes';
import apprenantRoutes from './routes/apprenant.routes';
import particulierRoutes from './routes/particulier.routes';
import entrepriseRoutes from './routes/entreprise.routes';
import formationRoutes from './routes/formation.routes';
import sessionRoutes from './routes/session.routes';
import sessionApprenantRoutes from './routes/sessionApprenant.routes';
import documentRoutes from './routes/document.routes';
import grilleRoutes from './routes/grille.routes';
import questionnaireRoutes from './routes/questionnaire.routes';
import authRoutes from './routes/auth.routes';

import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/apprenants', apprenantRoutes);
app.use('/api/particuliers', particulierRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/inscriptions', sessionApprenantRoutes);
app.use('/api/documents', documentRoutes);
app.use('/documents', express.static(path.join(__dirname, '../documents')));
app.use('/api/grilles', grilleRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/auth', authRoutes);
app.get("/", (_, res) => {
  res.send("✅ API SmartERP prête !");
});

export default app;
