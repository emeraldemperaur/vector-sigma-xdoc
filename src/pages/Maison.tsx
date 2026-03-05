import AdRibbon from "../components/AdRibbon";
import CodeDemoSection  from "../components/DemoSection";
import FeaturesRibbon from "../components/FeaturesRibbon";
import FooterSection from "../components/FooterSection";
import InstallSection from "../components/InstallationSection";
import ProductRibbon from "../components/ProductRibbon";

const Maison = () => {
    return(
        <>
        <br/>
        <ProductRibbon darkMode={true} title="V&Sigma;CTOR &Sigma;" subtitle="Dynamic Form Orchestrator"
        description="Vector Sigma is a dynamic form orchestrator package for rapidly creating and managing the complex lifecycle of interactive extensible input forms 
        that can be easily embedded into a React front-end client interface for use in data pipelines, onboarding applications or automation workflows. 
        Customizable to fit seamlessly into an existing design system and enable agile developer control of the visual layer and theming." 
        icon={<i className="fa-brands fa-npm"></i>} />
        <InstallSection darkMode={true} subtitle="ΣχTANT VERSION v1.5.0" variant="material"/>
        <AdRibbon darkMode={true}/>
        <FeaturesRibbon darkMode={false}/>
        <CodeDemoSection darkMode={false}/>
        <FooterSection/>
        </>
    )

}

export default Maison;