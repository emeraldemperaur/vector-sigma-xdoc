import { useEffect } from "react";
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import { Flex, Box, Heading, Text, Card } from '@radix-ui/themes';
import { airflowOnboardingData } from "../utils/airflowSchema";
import { useNavigate } from 'react-router-dom';

const AirflowDAGShowcase = ({darkMode}: {darkMode: boolean}) => {
    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);

    const navigator = useNavigate();

    const returnToShowcase = () => {
      navigator('/showcase')
    }
 
    const xFormBuilder = useVectorSigma(airflowOnboardingData)
        .setName('Apache Airflow DAG Provisioning')
        .setBrand("#017CEE", "", 'left')

    return (
    <Flex direction="column" style={{marginTop: '69px', minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
      
      <Box style={{ padding: '2rem', backgroundColor: '#017CEE', color: 'white' }}>
        <Heading as="h1" size="8"
        style={{ fontWeight: 400, letterSpacing: '0.06em', fontFamily: 'Libre Franklin'}}>
          Data Engineering Portal</Heading>
        <Text size="3" 
        style={{ fontWeight: 200, letterSpacing: '0.06em', fontFamily: 'Libre Franklin' }}>Complete the provisioning schema below to deploy your DAG.</Text>
      </Box>

      <Flex justify="center" style={{ padding: '3rem 1rem', flexGrow: 1 }}>
        <Card size="4" style={{ width: '100%', borderRadius: '0px' }}>
          
          
    {xFormBuilder.render(
        { displayMode: 'accordion',
        readOnlyMode: false,
        async onSubmit(values, actions, instance) {
            console.log(`xForm InProgress Timestamp:`, instance.timeInProgress);
            const timeTakenMs = (instance.timeSubmitted || Date.now()) - instance.timeCreated;
            console.log(`VΣ User finished the xForm in ${timeTakenMs / 1000} seconds.`)
            try {
                    // Initiate HTTP POST request with stateful 'values' and 'instance' payload
                    await fetch(`https://airflow.apache.org/api/v2/dags/${instance.formObject.uuid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            dag_id: instance.formObject.uuid,
                            dag_run_id: instance.formObject.uuid,
                            dagPayload: values
                        })
                    });
                    
                    // Reset form after HTTP POST request success and more (i.e. https://formik.org/docs/api/formik)
                    actions.resetForm(); 
                    alert("VΣ DAG Provisioning initiated!");
                } catch (error) {
                    console.error("Failed to initialize VΣ DAG Provisioning", error);
                }
        },

        })}

        </Card>
      </Flex>

      <Box style={{ padding: '1rem', textAlign: 'center', backgroundColor: 'var(--gray-3)' }}>
        <Text size="2" color="gray" onClick={() => returnToShowcase()}
        style={{fontFamily: "Libre Baskerville", fontWeight: 600, letterSpacing: "0.06em", color: "#017CEE",
          cursor: "pointer"
        }}>
          RETURN TO Ω SHOWCASE
        </Text>
      </Box>

    </Flex>
  );
}

export default AirflowDAGShowcase;