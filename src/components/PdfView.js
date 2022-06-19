
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import {Col, Container, Row, Pagination} from "react-bootstrap";


export default function PdfView() {
  pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();

  let link = "http://localhost:4000/pdfs/getPdf/" + params.id;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6}>
          <div className='text-light text-center'>
            <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} className="page" />
            </Document>
            <Pagination className='justify-content-center paginate-style'>
              <Pagination.Prev onClick={() => {
                if (!(pageNumber <= 1)){
                  setPageNumber(pageNumber - 1)
                }
              }}/>
              <Pagination.Item>{pageNumber}</Pagination.Item>
              <Pagination.Next onClick={() => {
                console.log(numPages);
                if (pageNumber <= numPages){
                  setPageNumber(pageNumber + 1)
                }
              }}/>
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
