import {MigrationInterface, QueryRunner} from "typeorm";

export class ExampleRepositories1612448906950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const oldEntries = [
            { url: 'https://github.com/gitpod-io/django-locallibrary-tutorial', description: '**Python** - Tutorial "Local Library" website written in Django', priority: 10 },
            { url: 'https://github.com/gitpod-io/gs-spring-boot.git', description: '**Java** - Building an Application with Spring Boot', priority: 9 },
            { url: 'https://github.com/gitpod-io/NextSimpleStarter.git', description: '**JavaScript** - Simple PWA boilerplate with Next.js and Redux', priority: 8 },
            { url: 'https://github.com/gitpod-io/go-gin-app.git', description: '**Go** - A simple web app implemented in Go and Gin', priority: 7 },
            { url: 'https://github.com/gitpod-io/rails_sample_app', description: '**Ruby on Rails** - Tutorial sample application', priority: 6 },
            { url: 'https://github.com/gitpod-io/symfony-demo.git', description: '**PHP** - Symfony Demo Application', priority: 5 },
            { url: 'https://github.com/theia-ide/theia.git', description: '**Typescript** - Deep dive into Gitpod\\\'s open-source IDE, Theia.', priority: 4 }
        ];
        const newEntries = [
            { url: 'https://github.com/eclipse-theia/theia', description: '**TypeScript** – Theia, a cloud & desktop IDE framework implemented in TypeScript', priority: 80 },
            { url: 'https://github.com/prometheus/prometheus', description: '**Go** – Prometheus, a monitoring system and time series database', priority: 70 },
            { url: 'https://github.com/nushell/nushell', description: '**Rust** – Nushell, a terminal emulator written in Rust', priority: 60 },
            { url: 'https://github.com/gitpod-io/spring-petclinic', description: '**Java** – Spring PetClinic sample web application', priority: 50 },
            { url: 'https://github.com/breatheco-de/python-flask-api-tutorial', description: '**Python** – Interactive tutorial about Python Flask', priority: 40 },
            { url: 'https://github.com/gitpod-io/dotnetcore', description: '**C#** – Simple .NET Core application example', priority: 30 },
            { url: 'https://github.com/gitpod-io/ruby-on-rails', description: '**Ruby** – Rails example with PostgreSQL database', priority: 20 },
            { url: 'https://github.com/symfony/demo', description: '**PHP** – Symfony demo application', priority: 10 },
        ]
        const currentEntries = await queryRunner.query(`SELECT * FROM d_b_repository_white_list ORDER BY priority DESC`);
        if (JSON.stringify(currentEntries, null, 2) === JSON.stringify(oldEntries, null, 2)) {
            await queryRunner.query("DELETE FROM d_b_repository_white_list");
            await Promise.all(newEntries.map(e => queryRunner.query(`INSERT IGNORE INTO d_b_repository_white_list (url, description, priority) VALUES (?, ?, ?)`, [e.url, e.description, e.priority])));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
