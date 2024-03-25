import child from 'child_process';

export default class Server {
	private constructor(private readonly port: number) {}

	static readonly from = (port: number) => new this(port);

	getPort = () => {
		return this.port;
	};

	kill = () => {
		child.exec(`kill $(lsof -t -i:${this.port})`);
	};

	start = async () => {
		const server = child
			.exec(`make start arguments="-p ${this.port}"`)
			.on('spawn', () => {
				console.log(`Server is running on port "${this.port}"`);
			})
			.on('message', console.log)
			.on('error', console.error)
			.on('kill', () => {
				this.kill();
			});

		server.stdout?.setEncoding('utf-8');
		server.stderr?.setEncoding('utf-8');

		await new Promise<void>((resolve) => {
			server.stdout?.on('data', (data: string) => {
				if (data.includes(`${this.port}`)) {
					resolve();
				}
			});
		});
	};
}
