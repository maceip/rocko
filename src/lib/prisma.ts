import { PrismaClient } from "@prisma/client/edge";

let prisma: PrismaClient;
declare global {
	var __prisma: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the prisma with every change either.
if (process.env.NODE_ENV === "production") {

	setTimeout(() => {
		loadProdEdgeDelay()
	  }, 1000);

	function loadProdEdgeDelay(){
	prisma = new PrismaClient({
		datasources: {
		  db: {
			url: import.meta.env.VITE_PRISMA_DATA_PROXY
		  }
		}})
	prisma.$connect();
	}
} else {
	if (!global.__prisma) {
		global.__prisma = new PrismaClient()
		global.__prisma.$connect();
	}
	prisma = global.__prisma;
}

export { prisma };
