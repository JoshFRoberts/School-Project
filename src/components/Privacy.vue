<template>
    <div
      class="min-h-screen bg-background-cream dark:bg-dark-background-cream text-gray-800 dark:text-gray-200"
    >
      <!-- Header with decorative element -->
      <header class="relative py-16 overflow-hidden">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1
            class="text-4xl md:text-5xl font-bold text-center text-blue-950 dark:text-gray-100"
          >
            Datenschutzerklärung
          </h1>
        </div>
      </header>
  
      <!-- Main content -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div
          class="bg-background-LightGray dark:bg-dark-background-LightGray rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-300 hover:shadow-xl"
        >
          <!-- Table of Contents -->
          <section class="mb-10">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <ListOrdered class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Inhaltsverzeichnis
            </h2>
            <div class="pl-7 space-y-2 text-gray-700 dark:text-gray-300">
              <p v-for="(section, index) in sections" :key="index" class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" @click="scrollToSection(section.id)">
                {{ index + 1 }}. {{ section.title }}
              </p>
            </div>
          </section>
  
          <!-- Privacy at a glance section -->
          <section id="section-1" class="mb-10">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Shield class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              1. Datenschutz auf einen Blick
            </h2>
  
            <div class="pl-7 space-y-4 text-gray-700 dark:text-gray-300">
              <h3 class="font-medium text-lg">Allgemeine Hinweise</h3>
              <p class="leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
                Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
  
              <h3 class="font-medium text-lg">Datenerfassung auf dieser Website</h3>
              <h4 class="font-medium">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p class="leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
  
              <h4 class="font-medium">Wie erfassen wir Ihre Daten?</h4>
              <p class="leading-relaxed">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
                Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p class="leading-relaxed">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-
                Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit
                des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>
  
              <h4 class="font-medium">Wofür nutzen wir Ihre Daten?</h4>
              <p class="leading-relaxed">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
                Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge
                geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote,
                Bestellungen oder sonstige Auftragsanfragen verarbeitet.
              </p>
  
              <h4 class="font-medium">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p class="leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
                können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
              <p class="leading-relaxed">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
            </div>
          </section>
  
          <!-- Hosting section -->
          <section id="section-2" class="mb-10">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Server class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              2. Hosting
            </h2>
  
            <div class="pl-7 space-y-4 text-gray-700 dark:text-gray-300">
              <p class="leading-relaxed">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <h3 class="font-medium text-lg">Hetzner</h3>
              <p class="leading-relaxed">
                Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend Hetzner).
                Details entnehmen Sie der Datenschutzerklärung von Hetzner:
                <a href="https://www.hetzner.com/de/legal/privacy-policy/" class="text-blue-600 dark:text-blue-400 hover:underline">
                  https://www.hetzner.com/de/legal/privacy-policy/
                </a>.
              </p>
              <p class="leading-relaxed">
                Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
                berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine
                entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art.
                6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den
                Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG
                umfasst. Die Einwilligung ist jederzeit widerrufbar.
              </p>
            </div>
          </section>
  
          <!-- General information section -->
          <section id="section-3" class="mb-10">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <FileText class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
  
            <div class="pl-7 space-y-4 text-gray-700 dark:text-gray-300">
              <h3 class="font-medium text-lg">Datenschutz</h3>
              <p class="leading-relaxed">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
              </p>
              <p class="leading-relaxed">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
                Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
                und zu welchem Zweck das geschieht.
              </p>
              <p class="leading-relaxed">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                möglich.
              </p>
  
              <h3 class="font-medium text-lg">Hinweis zur verantwortlichen Stelle</h3>
              <p class="leading-relaxed">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div class="my-2">
                <p>BBS I Lüneburg, Spillbrunnenweg 1, 21337 Lüneburg</p>
                <p>Telefon: 04131 99220600</p>
                <p>E-Mail: datenschutz@bbs1-lueneburg.de</p>
              </div>
              <p class="leading-relaxed">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
                die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.)
                entscheidet.
              </p>
  
              <h3 class="font-medium text-lg">Speicherdauer</h3>
              <p class="leading-relaxed">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
                personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
              </p>
  
              <h3 class="font-medium text-lg">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
              <p class="leading-relaxed">
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien
                nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung
                personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art.
                49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in
                Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich
                auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
                Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre
                Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese
                zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
                Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f
                DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden
                Absätzen dieser Datenschutzerklärung informiert.
              </p>
  
              <h3 class="font-medium text-lg">Empfänger von personenbezogenen Daten</h3>
              <p class="leading-relaxed">
                Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei
                ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich.
                Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer
                Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten
                an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe
                haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von
                Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen
                Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über
                gemeinsame Verarbeitung geschlossen.
              </p>
  
              <h3 class="font-medium text-lg">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p class="leading-relaxed">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
  
              <h3 class="font-medium text-lg">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
              <p class="leading-relaxed font-semibold">
                WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
                ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN
                SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN
                WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES
                PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
                ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN,
                WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
                SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG
                NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
                VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
                RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
              </p>
              <p class="leading-relaxed font-semibold">
                WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN,
                SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE
                BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG
                EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN
                VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
                ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH
                NACH ART. 21 ABS. 2 DSGVO).
              </p>
  
              <h3 class="font-medium text-lg">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p class="leading-relaxed">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
                oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
                verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </p>
  
              <h3 class="font-medium text-lg">Recht auf Datenübertragbarkeit</h3>
              <p class="leading-relaxed">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
                aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
                verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>
  
              <h3 class="font-medium text-lg">Auskunft, Berichtigung und Löschung</h3>
              <p class="leading-relaxed">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
                Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
                zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>
  
              <h3 class="font-medium text-lg">Recht auf Einschränkung der Verarbeitung</h3>
              <p class="leading-relaxed">
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
                folgenden Fällen:
              </p>
              <ul class="list-disc pl-5 space-y-2">
                <li>
                  Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir
                  in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
                  Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
                  statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                </li>
                <li>
                  Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                  Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                  Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen
                  Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
                  überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                  zu verlangen.
                </li>
              </ul>
              <p class="leading-relaxed">
                Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
                ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
                Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
                juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder
                eines Mitgliedstaats verarbeitet werden.
              </p>
            </div>
          </section>
  
          <!-- Data collection section -->
          <section id="section-4" class="mb-10">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <Database class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              4. Datenerfassung auf dieser Website
            </h2>
  
            <div class="pl-7 space-y-4 text-gray-700 dark:text-gray-300">
              <h3 class="font-medium text-lg">Kontaktformular</h3>
              <p class="leading-relaxed">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </p>
              <p class="leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
                der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der
                effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit
                widerrufbar.
              </p>
              <p class="leading-relaxed">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
                (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen –
                insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
  
              <h3 class="font-medium text-lg">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p class="leading-relaxed">
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus
                hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
                bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p class="leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
                der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der
                effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit
                widerrufbar.
              </p>
              <p class="leading-relaxed">
                Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung
                auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
                (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen –
                insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </div>
          </section>
  
          <!-- Source section -->
          <section class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Quelle:
              <a href="https://www.e-recht24.de/" class="text-blue-600 dark:text-blue-400 hover:underline">
                https://www.e-recht24.de/
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    Shield,
    Server,
    FileText,
    Database,
    ListOrdered
  } from "lucide-vue-next";
  
  // Define sections for the table of contents
  const sections = [
    { id: 'section-1', title: 'Datenschutz auf einen Blick' },
    { id: 'section-2', title: 'Hosting' },
    { id: 'section-3', title: 'Allgemeine Hinweise und Pflichtinformationen' },
    { id: 'section-4', title: 'Datenerfassung auf dieser Website' }
  ];
  
  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  </script>
  
  <style scoped>
  /* Custom styles for the privacy policy page */
  .bg-background-cream {
    background-color: #fafaf9;
  }
  
  .dark .bg-dark-background-cream {
    background-color: #1a1a1a;
  }
  
  .bg-background-LightGray {
    background-color: #ffffff;
  }
  
  .dark .bg-dark-background-LightGray {
    background-color: #242424;
  }
  </style>
  
  