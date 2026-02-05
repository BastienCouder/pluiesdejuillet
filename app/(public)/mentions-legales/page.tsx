export default function MentionsLegalesPage() {
    return (
        <section className="py-12 md:py-24 max-w-4xl text-foreground mx-auto">
            <h1 className="text-3xl font-bold mb-8 font-display uppercase">Mentions Légales</h1>

            <div className="prose prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">1. Éditeur du site</h2>
                    <p>
                        Le site Les Pluies de Juillet est édité par l&apos;association Les Pluies de Juillet.<br />
                        Siège social : [Adresse de l&apos;association]<br />
                        Email : contact@lespluiesdejuillet.org<br />
                        Directeur de la publication : [Nom du directeur]
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">2. Hébergement</h2>
                    <p>
                        Ce site est hébergé par ovhcloud<br />
                        255, rue de la République<br />
                        59000 Lille
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">3. Propriété intellectuelle</h2>
                    <p>
                        L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                    </p>
                </section>
            </div>
        </section>
    );
}