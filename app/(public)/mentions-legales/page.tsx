export default function MentionsLegalesPage() {
  return (
    <section className="text-foreground mx-auto max-w-4xl py-12 md:py-24">
      <h1 className="font-display mb-8 text-3xl font-bold uppercase">
        Mentions Légales
      </h1>

      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold uppercase">
            1. Éditeur du site
          </h2>
          <p>
            Le site Les Pluies de Juillet est édité par l&apos;association Les
            Pluies de Juillet.
            <br />
            Siège social : [Adresse de l&apos;association]
            <br />
            Email : contact@lespluiesdejuillet.org
            <br />
            Directeur de la publication : [Nom du directeur]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold uppercase">2. Hébergement</h2>
          <p>
            Ce site est hébergé par ovhcloud
            <br />
            255, rue de la République
            <br />
            59000 Lille
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold uppercase">
            3. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble de ce site relève de la législation française et
            internationale sur le droit d&apos;auteur et la propriété
            intellectuelle. Tous les droits de reproduction sont réservés.
          </p>
        </section>
      </div>
    </section>
  )
}
