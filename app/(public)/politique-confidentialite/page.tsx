export default function PolitiqueConfidentialitePage() {
    return (
        <section className="py-12 md:py-24 max-w-4xl mx-auto text-foreground">
            <h1 className="text-3xl font-bold mb-8 font-display uppercase">Politique de Confidentialité</h1>

            <div className="prose prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">1. Collecte des données</h2>
                    <p>
                        Nous collectons les informations que vous nous fournissez notamment lors de votre inscription (nom, prénom, email). Ces données sont nécessaires pour la gestion de votre compte et de vos réservations.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">2. Utilisation des données</h2>
                    <p>
                        Vos données sont utilisées pour :
                        <ul className="list-disc pl-6 mt-2">
                            <li>Gérer votre compte utilisateur</li>
                            <li>Vous permettre de réserver des places aux conférences</li>
                            <li>Vous envoyer des informations relatives à l&apos;événement</li>
                        </ul>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">3. Protection des données</h2>
                    <p>
                        Conformément à la loi &quot;Informatique et Libertés&quot; et au RGPD, vous disposez d&apos;un droit d&apos;accès, de modification et de suppression de vos données. Pour exercer ce droit, vous pouvez nous contacter ou supprimer votre compte directement depuis votre espace personnel.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 uppercase">4. Cookies</h2>
                    <p>
                        Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du site (session utilisateur).
                    </p>
                </section>
            </div>
        </section>
    );
}