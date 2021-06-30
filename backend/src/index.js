import express from 'express';
import TaskRoutes from './routes/TaskRoutes'

const server = express();

server.use(express.json());
server.use('/task', TaskRoutes);

server.listen(3000, () => {
    
});

/*
{
	"macaddress": "11:11:11:11:11:11",
	"type": 1,
	"title": "Comprar Café",
	"description": "No mercado X está em promoção.",
	"when": "2020-12-17T14:30:00.000"
}
*/
