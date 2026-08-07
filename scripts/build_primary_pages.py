#!/usr/bin/env python3
"""Build the primary static pages from one consistent Riva architecture."""
from pathlib import Path
import html
import json

from gtm import inject_gtm

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.rivastrategies.com"
PHONE = "832-905-0570"


def esc(value):
    return html.escape(value, quote=True)


def head(title, description, path, schema):
    url = BASE + path
    depth = len([part for part in path.strip("/").split("/") if part])
    asset_prefix = "../" * depth
    return f'''<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="{url}" />
  <link rel="icon" type="image/png" href="{asset_prefix}images/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Riva Strategies" />
  <meta property="og:title" content="{esc(title)}" />
  <meta property="og:description" content="{esc(description)}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{BASE}/images/riva_landscape_1600x900.png" />
  <meta property="og:image:alt" content="Riva Strategies" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{esc(title)}" />
  <meta name="twitter:description" content="{esc(description)}" />
  <meta name="twitter:image" content="{BASE}/images/riva_landscape_1600x900.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{asset_prefix}assets/site.css" />
  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False, indent=2)}</script>
</head>'''


def header(active=""):
    links = [("Home", "/", "home"), ("Services", "/services/", "services"), ("Industries", "/industries/", "industries"), ("FAQ", "/faq/", "faq")]
    desktop = "".join(f'<a href="{url}" class="{"active" if key == active else ""}">{label}</a>' for label, url, key in links)
    mobile = "".join(f'<a href="{url}">{label}</a>' for label, url, _ in links)
    return f'''<header class="site-header"><div class="wrap nav">
  <a class="brand" href="/"><img src="/images/Untitled Design - 1 - Edited.png" alt="Riva Strategies" /></a>
  <nav class="nav-links" aria-label="Primary navigation">{desktop}<a class="button" href="/contact/">Start a Conversation</a></nav>
  <button class="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
</div><nav class="mobile-nav" aria-label="Mobile navigation">{mobile}<a href="/contact/">Start a Conversation</a></nav></header>'''


def footer():
    return f'''<footer class="site-footer"><div class="wrap">
  <div class="footer-grid">
    <div><h3>Riva Strategies</h3><p>Strategy, technology, marketing and business systems for organizations ready to remove constraints and build durable growth.</p><div class="local-note"><span>⌖</span><span>Based in the Houston–Gulf Coast region. Serving clients throughout Texas and across the United States.</span></div></div>
    <div><h3>Divisions</h3><ul><li><a href="/rivahospitality/">Riva Hospitality Partners</a></li><li><a href="/#divisions">Riva Service Partners</a></li><li><a href="/#divisions">Riva Represents</a></li></ul></div>
    <div><h3>Start Here</h3><ul><li><a href="/#audits">Digital Visibility Audit</a></li><li><a href="/#audits">Growth Systems Audit</a></li><li><a href="/#protocols">Recovery Protocol</a></li><li><a href="/#protocols">Business Operating System</a></li></ul></div>
    <div><h3>Connect</h3><ul><li><a href="tel:+18329050570">{PHONE}</a></li><li><a href="mailto:jordan@rivastrategies.com">jordan@rivastrategies.com</a></li><li><a href="/contact/">Contact Riva</a></li><li><a href="/privacy-policy/">Privacy Policy</a></li></ul></div>
  </div>
  <div class="footer-bottom"><span>© 2026 Riva Strategies. All rights reserved.</span><span>Houston–Gulf Coast · Texas · United States</span></div>
</div></footer>
<script>
const toggle=document.querySelector('.mobile-toggle'),mobile=document.querySelector('.mobile-nav');
if(toggle&&mobile)toggle.addEventListener('click',()=>{{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));}});
if(location.protocol==='file:'){{const marker='/riva-strategies-live/';const at=location.pathname.indexOf(marker);if(at!==-1){{const root=location.pathname.slice(0,at+marker.length);document.querySelectorAll('a[href^="/"]').forEach(a=>{{const raw=a.getAttribute('href');const parts=raw.split('#');let target=root+parts[0].slice(1);if(!parts[0]||parts[0].endsWith('/'))target+='index.html';a.href='file://'+target+(parts[1]?'#'+parts[1]:'');}});document.querySelectorAll('[src^="/"]').forEach(el=>{{el.src='file://'+root+el.getAttribute('src').slice(1);}});}}}}
</script>'''


def page_schema(title, description, path, kind="WebPage"):
    url = BASE + path
    return {"@context":"https://schema.org","@graph":[
        {"@type":"Organization","@id":BASE+"/#organization","name":"Riva Strategies","url":BASE+"/","telephone":"+1-832-905-0570","description":"Strategy, technology, marketing and business systems for organizations ready to remove growth constraints.","areaServed":[{"@type":"AdministrativeArea","name":"Houston–Gulf Coast region"},{"@type":"State","name":"Texas"},{"@type":"Country","name":"United States"}],"sameAs":["https://www.facebook.com/rivastrategies","https://x.com/RivaStrategies"]},
        {"@type":kind,"@id":url+"#webpage","url":url,"name":title,"description":description,"inLanguage":"en-US","isPartOf":{"@id":BASE+"/#website"},"about":{"@id":BASE+"/#organization"}}
    ]}


def shell(title, description, path, schema, active, body):
    document = "<!DOCTYPE html>\n<html lang=\"en\">\n" + head(title, description, path, schema) + "\n<body>\n" + header(active) + body + footer() + "\n</body>\n</html>\n"
    return inject_gtm(document)


INDUSTRIES = {
"hospitality-food-service": {
 "name":"Hospitality & Food Service","title":"Hospitality Growth Consulting | Riva Strategies","desc":"Growth systems for restaurants, bars, hotels, resorts, marinas and clubs—from visibility and guest acquisition to retention and revenue expansion.","lead":"Turn attention into loyal guests, stronger revenue and an operation built to perform beyond the next promotion.","sub":["Restaurants & bars","Hotels & resorts","Marinas & private clubs","Catering & event venues","Multi-location hospitality groups"],"constraints":["Fragmented visibility across search, maps and review platforms","Guest acquisition costs rising without dependable retention","Catering, events and partnerships underdeveloped","Reporting disconnected from actual revenue","Growth dependent on owner intervention"],"outcome":"A connected hospitality growth system spanning visibility, guest acquisition, retention, revenue expansion and strategic development.","division":"Riva Hospitality Partners","division_url":"/rivahospitality/"},
"local-field-services": {
 "name":"Local & Field Services","title":"Field Service Growth Consulting | Riva Strategies","desc":"Growth and operating systems for HVAC, plumbing, electrical, construction, landscaping, automotive and other service-area businesses.","lead":"Build a stronger local signal, convert more qualified demand and give the field operation systems that scale with the market.","sub":["HVAC, plumbing & electrical","Construction & specialty trades","Landscaping & outdoor services","Automotive service & repair","Facility and property services"],"constraints":["Inconsistent Google and local-search visibility","Slow response and weak lead-to-booking conversion","Dispatch, follow-up and estimates handled manually","Reputation growth left to chance","Owner carrying sales and operational knowledge"],"outcome":"A measurable local-demand engine connected to response, quoting, follow-up, reputation and repeat-service systems.","division":"Riva Service Partners","division_url":"/#divisions"},
"professional-services": {
 "name":"Professional Services","title":"Professional Services Growth Consulting | Riva Strategies","desc":"Positioning, demand generation, client acquisition and delivery systems for consultancies, legal, accounting, engineering and other professional firms.","lead":"Turn expertise into a clear market position, a dependable pipeline and a delivery model that does not depend on a few rainmakers.","sub":["Consulting & advisory firms","Legal & accounting practices","Architecture & engineering","Agencies & creative firms","Specialized B2B providers"],"constraints":["Expertise difficult for buyers to differentiate","Referrals producing an uneven pipeline","Business development concentrated in senior leaders","Proposals and follow-up inconsistent","Delivery knowledge trapped in individuals"],"outcome":"A credible expertise platform connected to business development, qualification, proposal, delivery and client-growth systems.","division":"Riva Strategies","division_url":"/services/"},
"retail-ecommerce": {
 "name":"Retail & E-Commerce","title":"Retail & E-Commerce Growth Systems | Riva Strategies","desc":"Customer acquisition, conversion, retention and operating systems for retailers, e-commerce brands and omnichannel businesses.","lead":"Connect acquisition, merchandising, conversion and retention so growth creates customer value—not just more traffic.","sub":["Specialty retail","Direct-to-consumer brands","Omnichannel operators","Subscription commerce","Multi-location retail"],"constraints":["Paid acquisition disconnected from margin","Weak conversion and merchandising signals","Customer data fragmented across platforms","Retention and lifecycle communication underbuilt","Inventory and marketing decisions made in silos"],"outcome":"An integrated commerce system that measures profitable demand, improves conversion and compounds customer value.","division":"Riva Strategies","division_url":"/services/"},
"real-estate-development": {
 "name":"Real Estate & Development","title":"Real Estate Growth Consulting | Riva Strategies","desc":"Market positioning, lead systems, stakeholder communications and operational infrastructure for real estate and development organizations.","lead":"Clarify the opportunity, reach the right stakeholders and give every project a disciplined path from market interest to execution.","sub":["Commercial development","Residential communities","Brokerage & advisory","Property management","Architecture, construction & project teams"],"constraints":["Complex offerings explained generically","Long cycles with inconsistent stakeholder follow-up","Project information fragmented across teams","Local market proof underused","Reporting stops at lead volume"],"outcome":"A market-development system connecting positioning, stakeholder demand, project communication, follow-up and decision intelligence.","division":"Riva Strategies","division_url":"/services/"},
"healthcare-medical": {
 "name":"Healthcare & Medical","title":"Healthcare & Medical Growth Systems | Riva Strategies","desc":"Patient-access, reputation, referral and operating systems for medical groups, clinics and healthcare service organizations.","lead":"Improve access, trust and follow-through while respecting the operational and reputational realities of healthcare.","sub":["Medical groups & clinics","Dental and specialty practices","Behavioral health providers","Healthcare service companies","Multi-location practices"],"constraints":["Patient access and response inconsistent","Local trust signals incomplete","Referral development undocumented","Systems fragmented across locations","Marketing activity disconnected from capacity"],"outcome":"A responsible growth system connecting visibility, access, reputation, referral relationships, workflow and capacity.","division":"Riva Strategies","division_url":"/services/"},
"technology-software": {
 "name":"Technology & Software","title":"Technology Growth Consulting | Riva Strategies","desc":"Go-to-market, demand, sales enablement, customer success and operating systems for software and technology companies.","lead":"Translate technical capability into buyer relevance, a disciplined revenue motion and customer learning that improves the product.","sub":["B2B SaaS","Vertical software","Technology services","Industrial technology","AI and automation products"],"constraints":["Technical value not translated into buyer outcomes","Pipeline stages and qualification unclear","Founder-led selling difficult to transfer","Product, sales and customer feedback disconnected","Reporting emphasizes activity over adoption and revenue"],"outcome":"A go-to-market system connecting positioning, demand, sales, onboarding, customer success and product intelligence.","division":"Riva Strategies","division_url":"/services/"},
"manufacturing-logistics": {
 "name":"Manufacturing & Logistics","title":"Manufacturing Growth Systems | Riva Strategies","desc":"Business development, estimating, account growth and operating systems for manufacturers, distributors, logistics and industrial service companies.","lead":"Build a stronger commercial system around complex work, long sales cycles and the operational knowledge that wins profitable accounts.","sub":["Manufacturing & fabrication","Distribution & supply","Logistics & transportation","Industrial services","Energy and infrastructure suppliers"],"constraints":["Estimating and opportunity knowledge concentrated in veterans","Long-cycle follow-up inconsistent","Capabilities presented without buyer context","Account development reactive","Commercial and operational data disconnected"],"outcome":"A disciplined industrial growth system connecting market intelligence, estimating, business development, account expansion and delivery knowledge.","division":"Riva Strategies","division_url":"/services/"},
"financial-services": {
 "name":"Financial Services","title":"Financial Services Growth Consulting | Riva Strategies","desc":"Trust, client acquisition, relationship development and operating systems for financial, insurance and advisory organizations.","lead":"Build trust before the conversation, improve relationship development and make client growth measurable without sacrificing credibility.","sub":["Financial advisory","Insurance services","Commercial finance","Accounting & tax","Specialty financial providers"],"constraints":["Differentiation limited to credentials and claims","Relationship development dependent on individuals","Educational content disconnected from conversion","Lead handling and follow-up inconsistent","Compliance review slows execution"],"outcome":"A trust-led growth system connecting expertise, education, relationship development, qualification and client expansion.","division":"Riva Strategies","division_url":"/services/"},
"non-profit-education": {
 "name":"Non-Profit & Education","title":"Non-Profit & Education Growth Systems | Riva Strategies","desc":"Visibility, stakeholder engagement, fundraising, enrollment and operating systems for non-profits, associations and educational organizations.","lead":"Turn mission into clear stakeholder value, stronger participation and systems that protect impact as the organization grows.","sub":["Non-profit organizations","Associations & memberships","Higher and continuing education","Workforce development","Community initiatives"],"constraints":["Mission clear internally but vague to outside audiences","Stakeholder data fragmented","Fundraising or enrollment campaigns episodic","Programs difficult to discover in search","Institutional knowledge vulnerable to turnover"],"outcome":"A mission-aligned system connecting visibility, stakeholder engagement, development, program growth and organizational knowledge.","division":"Riva Strategies","division_url":"/services/"}
}


def industry_page(slug, data):
    path=f"/industries/{slug}/"; url=BASE+path
    faq=[
      (f"What does Riva Strategies improve for {data['name'].lower()} organizations?", data["outcome"]),
      ("Do you provide strategy only?", "No. Riva can diagnose the constraint, engineer the system, support execution and establish the reporting and operating rhythm needed to improve it."),
      ("Where does Riva work?", "Riva Strategies is based in the Houston–Gulf Coast region, works onsite across its service area, and supports qualified organizations throughout Texas and across the United States.")]
    schema=page_schema(data["title"],data["desc"],path)
    schema["@graph"].extend([
      {"@type":"BreadcrumbList","@id":url+"#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},{"@type":"ListItem","position":2,"name":"Industries","item":BASE+"/industries/"},{"@type":"ListItem","position":3,"name":data["name"],"item":url}]},
      {"@type":"Service","@id":url+"#service","name":data["name"]+" Growth Systems","provider":{"@id":BASE+"/#organization"},"areaServed":{"@type":"Country","name":"United States"},"description":data["outcome"],"audience":{"@type":"BusinessAudience","audienceType":data["name"]}},
      {"@type":"FAQPage","@id":url+"#faq","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faq]}
    ])
    body=f'''{header("industries")}<main>
<div class="wrap breadcrumb"><a href="/">Home</a> / <a href="/industries/">Industries</a> / {esc(data['name'])}</div>
<section class="hero"><div class="wrap"><div class="eyebrow">Industry Growth Systems</div><h1>{esc(data['name'])}</h1><p>{esc(data['lead'])}</p><div class="actions"><a class="button" href="/contact/">Discuss Your Constraint</a><a class="button light" href="/industries/">All Industries</a></div></div></section>
<section class="section soft"><div class="wrap"><div class="eyebrow">The Market</div><h2>Built around how this industry actually works.</h2><p class="section-intro">The channels, buying cycle, operating realities and economics are different in every market. Riva starts with those facts—not a prepackaged campaign.</p><div class="chips">{''.join(f'<span class="chip">{esc(x)}</span>' for x in data['sub'])}</div></div></section>
<section class="section"><div class="wrap split"><div><div class="eyebrow">Common Constraints</div><h2>Where growth usually breaks down.</h2><p class="section-intro">The visible symptom is rarely the whole problem. We examine the commercial and operating system around it before prescribing work.</p></div><ul class="list">{''.join(f'<li>{esc(x)}</li>' for x in data['constraints'])}</ul></div></section>
<section class="section blue"><div class="wrap"><div class="eyebrow">Shared Capabilities</div><h2>One coordinated system—not disconnected tactics.</h2><p class="section-intro">Riva assembles the capabilities the constraint requires and connects them to decisions, ownership and measurement.</p><div class="grid four"><div class="card dark"><h3>Visibility</h3><p>Search, AI discovery, content, reputation and digital infrastructure.</p></div><div class="card dark"><h3>Demand</h3><p>Positioning, acquisition, business development and conversion.</p></div><div class="card dark"><h3>Systems</h3><p>Workflow, CRM, automation, knowledge and operating discipline.</p></div><div class="card dark"><h3>Intelligence</h3><p>Analytics, reporting, priorities and continuous optimization.</p></div></div></div></section>
<section class="section"><div class="wrap"><div class="eyebrow">Riva Method</div><h2>Discover → Engineer → Execute → Optimize</h2><div class="grid four"><div class="card"><span class="number">1</span><h3>Discover</h3><p>Establish facts, ownership, baseline performance and the highest-return constraint.</p></div><div class="card"><span class="number">2</span><h3>Engineer</h3><p>Design the connected strategy, systems, responsibilities and measurement plan.</p></div><div class="card"><span class="number">3</span><h3>Execute</h3><p>Build, launch, train and support adoption across the people doing the work.</p></div><div class="card"><span class="number">4</span><h3>Optimize</h3><p>Use real performance data to improve the system and redirect resources.</p></div></div><div class="proof" style="margin-top:34px"><strong>Division alignment:</strong> This market is supported through <a href="{data['division_url']}">{esc(data['division'])}</a>, backed by Riva Strategies' shared capabilities.</div></div></section>
<section class="section soft faq"><div class="wrap"><div class="eyebrow">Questions</div><h2>What operators ask first.</h2>{''.join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q,a in faq)}</div></section>
<section class="cta"><div class="wrap"><h2>Find the constraint before funding the solution.</h2><p>{esc(data['outcome'])}</p><div class="actions" style="justify-content:center"><a class="button" href="/contact/">Start a Conversation</a><a class="button outline" href="/#audits">Compare Riva Audits</a></div></div></section>
</main>{footer()}'''
    document = "<!DOCTYPE html>\n<html lang=\"en\">\n"+head(data["title"],data["desc"],path,schema)+"\n<body>"+body+"</body>\n</html>\n"
    return inject_gtm(document)


FAQS = [
("What does Riva Strategies do?","Riva Strategies combines strategy, technology, marketing, AI, automation and business systems to remove the constraint limiting growth. Work is organized through three divisions and delivered through the Discover, Engineer, Execute and Optimize stages."),
("What is the difference between the two audits?","The Digital Visibility Audit focuses on search and AI discovery, business profiles, website structure, reputation, citations, analytics and digital ownership. The Growth Systems Audit examines the broader acquisition, conversion, retention, technology, reporting, revenue and operating system."),
("What are Riva's three divisions?","Riva Hospitality Partners supports hospitality operators. Riva Service Partners supports local and field service businesses. Riva Represents handles strategic representation, partnerships and market development."),
("Do you implement or only advise?","Both. Riva can diagnose and engineer the system, support implementation, train the people responsible for it and establish the measurement and optimization rhythm."),
("What are the engagement stages?","Discover establishes the facts and priority. Engineer designs the system. Execute builds and deploys it. Optimize uses performance data to improve it."),
("Do you provide individual marketing services?","Riva has capabilities across search, content, paid acquisition, web infrastructure, reputation, analytics, creative, automation and systems development. They are deployed around a business constraint rather than sold as disconnected tactics."),
("Where does Riva Strategies work?","Riva is based in the Houston–Gulf Coast region, works onsite across its service area and supports qualified organizations throughout Texas and across the United States."),
("Do you work with multi-location organizations?","Yes. Riva helps establish shared standards, location-level visibility, reporting, ownership and repeatable systems without ignoring local market differences."),
("Who is a strong fit?","Established, operator-led organizations with a real growth or operating constraint, leadership willing to share the facts and a commitment to implementing the system—not simply buying more activity."),
("How do we begin?","Start with a conversation. Riva will determine whether the Digital Visibility Audit, Growth Systems Audit, a division-specific engagement or another route is the responsible first step.")]


def build_faq():
    path="/faq/"; title="Frequently Asked Questions | Riva Strategies"; desc="Straight answers about Riva Strategies, its audits, divisions, capabilities, four-stage method, implementation model and service area."
    schema=page_schema(title,desc,path,"FAQPage"); schema["@graph"][1]["mainEntity"]=[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in FAQS]
    content=''.join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q,a in FAQS)
    body=f'''{header("faq")}<main><section class="hero light"><div class="wrap"><div class="eyebrow">Frequently Asked Questions</div><h1>Straight answers before the first conversation.</h1><p>How Riva diagnoses constraints, structures engagements and supports implementation.</p></div></section><section class="section soft faq"><div class="wrap">{content}</div></section><section class="cta"><div class="wrap"><h2>Still deciding where to begin?</h2><p>We will identify the responsible next step before recommending a scope.</p><div class="actions" style="justify-content:center"><a class="button" href="/contact/">Talk With Riva</a><a class="button outline" href="/#audits">Compare the Audits</a></div></div></section></main>{footer()}'''
    return shell(title,desc,path,schema,"faq",body.replace(header("faq"),"",1).replace(footer(),"",1))


def build_services():
    path="/services/"; title="Growth Strategy, Technology & Systems | Riva Strategies"; desc="Explore Riva Strategies audits, growth capabilities, recovery and operating-system protocols, implementation stages and specialized market divisions."
    schema=page_schema(title,desc,path,"CollectionPage")
    schema["@graph"].append({"@type":"OfferCatalog","@id":BASE+path+"#catalog","name":"Riva Strategies capabilities","provider":{"@id":BASE+"/#organization"},"itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":x}} for x in ["Digital Visibility Audit","Growth Systems Audit","Search & Discovery","Content & Authority","Paid Acquisition","AI & Automation","Systems Development","Web & Infrastructure","Reputation","Analytics & Reporting","Creative & Brand","Growth Strategy","Recovery Protocol","Business Operating System"]]})
    capabilities=[("Search & Discovery","Technical search, local visibility, business profiles and AI discovery."),("Content & Authority","Useful expertise, proof and publishing systems that build trust."),("Paid Acquisition","Measured demand generation tied to qualified opportunities."),("AI & Automation","Responsible workflows that reduce friction and improve response."),("Systems Development","Processes, knowledge and operating workflows designed to scale."),("Web & Infrastructure","Fast, accessible digital infrastructure that supports the ecosystem."),("Reputation","Review, trust and credibility systems that compound over time."),("Analytics & Reporting","Decision-ready measurement—not activity without context."),("Creative & Brand","Identity, messaging, photography, video and design."),("Growth Strategy","Priorities organized around the highest-return constraint.")]
    body=f'''<main><section class="hero"><div class="wrap"><div class="eyebrow">Riva Capabilities</div><h1>Build the system the constraint actually requires.</h1><p>Riva coordinates strategy, technology, marketing and operations around measurable business outcomes—not disconnected deliverables.</p><div class="actions"><a class="button" href="/contact/">Discuss Your Constraint</a><a class="button light" href="/#audits">Compare the Audits</a></div></div></section>
<section class="section soft"><div class="wrap"><div class="eyebrow">Start With Clarity</div><h2>Two audits. Two levels of diagnosis.</h2><div class="grid two"><div class="card"><h3>Digital Visibility Audit</h3><p>Search and AI discovery, Google Business Profile, website structure, reputation, citations, analytics and digital asset ownership.</p></div><div class="card"><h3>Growth Systems Audit</h3><p>Acquisition, conversion, retention, technology, automation, reporting, revenue expansion and operating constraints.</p></div></div></div></section>
<section class="section"><div class="wrap"><div class="eyebrow">Shared Capabilities</div><h2>Specialists organized around the outcome.</h2><p class="section-intro">Each engagement uses only the capabilities the diagnosis supports.</p><div class="grid two">{''.join(f'<div class="card"><h3>{esc(n)}</h3><p>{esc(d)}</p></div>' for n,d in capabilities)}</div></div></section>
<section class="section blue"><div class="wrap"><div class="eyebrow">Protocols</div><h2>Repair what is broken. Then build what lasts.</h2><div class="grid two"><div class="card dark"><h3>Riva Recovery Protocol</h3><p>Restore ownership, consistency, authority, visibility and measurement when the digital and operating foundation has become fragmented.</p></div><div class="card dark"><h3>Riva Business Operating System</h3><p>Connect company knowledge, departmental systems, AI, automation, training and continuous improvement into one durable operating foundation.</p></div></div></div></section>
<section class="section"><div class="wrap"><div class="eyebrow">Engagement Stages</div><h2>Discover → Engineer → Execute → Optimize</h2><div class="grid four"><div class="card"><span class="number">1</span><h3>Discover</h3><p>Facts, ownership, baseline and priority.</p></div><div class="card"><span class="number">2</span><h3>Engineer</h3><p>Strategy, system, responsibilities and measurement.</p></div><div class="card"><span class="number">3</span><h3>Execute</h3><p>Build, launch, training and adoption.</p></div><div class="card"><span class="number">4</span><h3>Optimize</h3><p>Performance, learning and continuous improvement.</p></div></div></div></section>
<section class="cta"><div class="wrap"><h2>Stop funding symptoms.</h2><p>Start with the facts, isolate the constraint and invest in the system that removes it.</p><div class="actions" style="justify-content:center"><a class="button" href="/contact/">Start a Conversation</a><a class="button outline" href="/industries/">Explore Industries</a></div></div></section></main>'''
    return shell(title,desc,path,schema,"services",body)


def build_contact():
    path="/contact/"; title="Contact Riva Strategies | Start With the Right Audit"; desc="Discuss a Digital Visibility Audit, Growth Systems Audit or division-specific engagement with Riva Strategies. Houston–Gulf Coast based; serving clients nationally."
    schema=page_schema(title,desc,path,"ContactPage"); schema["@graph"][1]["mainEntity"]={"@id":BASE+"/#organization"}
    body=f'''<main><section class="hero light"><div class="wrap"><div class="eyebrow">Start With Clarity</div><h1>Tell us what is not working.</h1><p>We will help determine whether the responsible first step is a visibility audit, a broader systems diagnosis or a division-specific conversation.</p></div></section>
<section class="section soft"><div class="wrap"><div class="eyebrow">Choose a Starting Point</div><h2>Diagnosis before scope.</h2><div class="grid three"><div class="card"><h3>Digital Visibility Audit</h3><p>For search, AI visibility, Google Business Profile, reputation, website structure, citations and measurement.</p></div><div class="card"><h3>Growth Systems Audit</h3><p>For acquisition, conversion, retention, technology, reporting, revenue and operating constraints.</p></div><div class="card"><h3>Division Conversation</h3><p>For hospitality, local and field services, strategic representation or market-development needs.</p></div></div></div></section>
<section class="section"><div class="wrap"><div class="eyebrow">Contact Riva</div><h2>Speak directly with the team.</h2><div class="contact-options"><a class="contact-option" href="tel:+18329050570"><strong>Call</strong><span>{PHONE}</span></a><a class="contact-option" href="mailto:jordan@rivastrategies.com?subject=Riva%20Strategies%20Inquiry"><strong>Email</strong><span>jordan@rivastrategies.com</span></a><div class="contact-option"><strong>Service Area</strong><span>Houston–Gulf Coast, Texas and qualified engagements across the United States</span></div></div><div class="proof" style="margin-top:32px">Riva meets clients onsite across its service area and supports hybrid and remote engagements when the work and operating context allow.</div></div></section>
<section class="cta"><div class="wrap"><h2>Bring the problem—not a predetermined shopping list.</h2><p>We will start by understanding the constraint, the decisions already made and the outcome that matters.</p><div class="actions" style="justify-content:center"><a class="button" href="mailto:jordan@rivastrategies.com?subject=Riva%20Strategies%20Inquiry">Email Riva</a><a class="button outline" href="tel:+18329050570">Call {PHONE}</a></div></div></section></main>'''
    return shell(title,desc,path,schema,"",body)


def redirect_page(source, target, label):
    canonical = BASE + target.split("#")[0]
    document = f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(label)} | Riva Strategies</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="{canonical}"><meta http-equiv="refresh" content="0; url={target}"><script>location.replace({json.dumps(target)});</script></head><body><p>This page has moved to <a href="{target}">{esc(label)}</a>.</p></body></html>\n'''
    return inject_gtm(document)


def protect_internal_page(path):
    file = ROOT / path
    if not file.exists():
        return
    text = file.read_text(encoding="utf-8", errors="ignore")
    if 'name="robots"' not in text:
        text = text.replace("<head>", '<head>\n  <meta name="robots" content="noindex,nofollow,noarchive" />', 1)
        file.write_text(text, encoding="utf-8")


def build_privacy():
    path="/privacy-policy/"; title="Privacy Policy | Riva Strategies"; desc="How Riva Strategies collects, uses and protects information submitted through its website and business inquiry channels."
    schema=page_schema(title,desc,path,"WebPage")
    body=f'''<main><section class="hero light"><div class="wrap"><div class="eyebrow">Legal</div><h1>Privacy Policy</h1><p>Effective June 5, 2026</p></div></section><section class="section"><div class="wrap" style="max-width:820px"><h2>Information we collect</h2><p class="section-intro">Riva Strategies may collect information you voluntarily provide, including your name, email address, phone number, company information, website address and the details included with an inquiry.</p><h2>How information is used</h2><p class="section-intro">Information may be used to respond to inquiries, provide requested audits or consultations, schedule conversations, deliver agreed communications and improve our services.</p><h2>Information sharing</h2><p class="section-intro">Riva Strategies does not sell personal information. Information may be shared with service providers when necessary to operate our systems or deliver an agreed service, subject to appropriate safeguards.</p><h2>Data security</h2><p class="section-intro">We use reasonable administrative and technical safeguards. No internet transmission or storage method can be guaranteed completely secure.</p><h2>Your choices</h2><p class="section-intro">You may request access, correction or deletion of information you submitted, or ask to stop non-transactional communications.</p><h2>Contact</h2><p class="section-intro">Riva Strategies · Houston–Gulf Coast region · <a href="mailto:jordan@rivastrategies.com">jordan@rivastrategies.com</a> · <a href="tel:+18329050570">{PHONE}</a></p></div></section></main>'''
    return shell(title,desc,path,schema,"",body)


def main():
    for slug,data in INDUSTRIES.items():
        (ROOT/"industries"/slug/"index.html").write_text(industry_page(slug,data),encoding="utf-8")
    (ROOT/"services"/"index.html").write_text(build_services(),encoding="utf-8")
    (ROOT/"faq"/"index.html").write_text(build_faq(),encoding="utf-8")
    (ROOT/"contact"/"index.html").write_text(build_contact(),encoding="utf-8")
    (ROOT/"privacy-policy"/"index.html").write_text(build_privacy(),encoding="utf-8")
    redirects = {
      "riva-revenue-audit/index.html": ("/#audits", "Riva Audits"),
      "riva-foundation/index.html": ("/#protocols", "Riva Protocols"),
      "riva-rollout/index.html": ("/services/", "Riva Capabilities"),
      "riva-reach/index.html": ("/services/", "Riva Capabilities"),
      "riva-engine/index.html": ("/services/", "Riva Capabilities"),
      "riva-reps/index.html": ("/#divisions", "Riva Divisions"),
      "riva-hospitality-partners/index.html": ("/rivahospitality/", "Riva Hospitality Partners")
    }
    for source,(target,label) in redirects.items():
        (ROOT/source).write_text(redirect_page(source,target,label),encoding="utf-8")
    for private in [
      "1822/index.html", "projects/cullens-pressure-washing/index.html",
      "red-river-cadence/index.html", "red-river-cantina-operations/index.html",
      "red-river-digital-operations-review/index.html",
      "reports/red-river-richmond-july-2026/index.html",
      "reports/red-river-richmond-may-2026/index.html",
      "riva-labs/industrial-estimating-review/index.html", "riva-react-playground/index.html"
    ]:
        protect_internal_page(private)


if __name__ == "__main__":
    main()
