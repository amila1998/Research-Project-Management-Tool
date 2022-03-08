import React from 'react';
import Header from './components/Headers/Header';
import Navbar from './components/Headers/navbar';
import Footer from './components/Footers/Footer';


import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      
       <BrowserRouter>
       <Header/>
       <Navbar/>
       
       <main>
       <p>Paragraphs are the building blocks of papers. Without well-written paragraphs that flow logically from one idea to the next and that inform and help support in some meaningful way the central research problem being investigated, your paper will not be viewed as credible and, well, you'll probably receive a poor grade.

Here are some suggestions for troubleshooting common problems associated with developing paragraphs:

1.  The paragraph has no controlling idea. Imagine each paragraph as having three general layers of text. The core content is in the middle. It includes all the evidence you need to make the point. However, this evidence needs to be introduced by a topic sentence in some way or your readers don't know what to do with all the evidence you have given them. Therefore, the beginning of the paragraph explains the controlling idea of the paragraph. The last part of the paragraph tells the reader how the paragraph relates to the broader argument and often provides a transition to the next idea. Once you have mastered the use of topic sentences, you may decide that the topic sentence for a particular paragraph really should not be the first sentence of the paragraph. This is fine—the topic sentence can actually go at the beginning, middle, or end of a paragraph; what's important is that it is there to inform readers what the main idea of the paragraph is and how it relates back to the broader thesis of your paper.

2.  The paragraph has more than one controlling idea. This is the most common reason why a paragraph is too long. If a paragraph is more than a page long, it likely contains more than one controlling idea. In this case, consider eliminating sentences that relate to the second idea, with the thought that maybe they don't really inform and help support the central research problem, or split the paragraph into two or more paragraphs, each with only one controlling idea.

3.  Transitions are needed within the paragraph. You are probably familiar with the idea that transitions may be needed between paragraphs or sections in a paper. Sometimes they are also helpful within the body of a single paragraph. Within a paragraph, transitions are often single words or short phrases that help to establish relationships between ideas and to create a logical progression of those ideas in a paragraph. This is especially true within paragraphs that discuss multiple examples or discuss complex ideas, issues, or concepts.

Arnaudet, Martin L. and Mary Ellen Barrett. Paragraph Development: A Guide for Students of English. 2nd edition. Englewood Cliffs, NJ: Prentice Hall Regents, 1990; Paragraph Development: Importance of Constructing Good Paragraphs. AP English Literature and Composition. Edublogs, 2012; Paragraphing. Centre for Applied Linguistics. University of Warwick.

Structure and Writing Style
I.  General Structure

Most paragraphs in an essay parallel the general three-part structure of each section of a research paper and, by extension, the overall research paper, with an introduction, a body that includes facts and analysis, and a conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating the meaning you intend to covey to the reader.

Introduction: the first section of a paragraph; should include the topic sentence and any other sentences at the beginning of the paragraph that give background information or provide a transition.

Body: follows the introduction; discusses the controlling idea, using facts, arguments, analysis, examples, and other information.

Conclusion: the final section; summarizes the connections between the information discussed in the body of the paragraph and the paragraph’s controlling idea. For long paragraphs, you may also want to include a bridge sentence that introduces the next paragraph or section of the paper. In some instances, the bridge sentence can be written in the form of a question. However, use this rhetorical device sparingly, otherwise, ending a lot of paragraphs with a question to lead into the next paragraph sounds cumbersome.

NOTE:  This general structure does not imply that you should not be creative in your writing. Arranging where each element goes in a paragraph can make a paper more engaging for the reader. However, do not be too creative in experimenting with the narrative flow of paragraphs. To do so may distract from the main arguments of your research and weaken the quality of your academic writing.

II.  Development and Organization

Before you can begin to determine what the composition of a particular paragraph will be, you must consider what is the most important idea that you are trying to convey to your reader. This is the "controlling idea," or the thesis statement from which you compose the remainder of the paragraph. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your controlling idea and the information in each paragraph. The research problem functions like a seed from which your paper, and your ideas, will grow. The whole process of paragraph development is an organic one—a natural progression from a seed idea to a full-blown research study where there are direct, familial relationships in the paper between all of  your controlling ideas and the paragraphs which derive from them.

The decision about what to put into your paragraphs begins with brainstorming about how you want to pursue the research problem. There are many techniques for brainstorming but, whichever one you choose, this stage of paragraph development cannot be skipped because it lays a foundation for developing a set of paragraphs [representing a section of your paper] that describes a specific element of your overall analysis. Each section is described further in this writing guide.

Given these factors, every paragraph in a paper should be:

Unified—All of the sentences in a single paragraph should be related to a single controlling idea [often expressed in the topic sentence of the paragraph].
Clearly related to the research problem—The sentences should all refer to the central idea, or the thesis, of the paper.
Coherent—The sentences should be arranged in a logical manner and should follow a definite plan for development.
Well-developed—Every idea discussed in the paragraph should be adequately explained and supported through evidence and details that work together to explain the paragraph's controlling idea.
There are many different ways you can organize a paragraph. However, the organization you choose will depend on the controlling idea of the paragraph. Ways to organize a paragraph in academic writing include:

Narrative: Tell a story. Go chronologically, from start to finish.
Descriptive: Provide specific details about what something looks or feels like. Organize spatially, in order of appearance, or by topic.
Process: Explain step by step how something works. Perhaps follow a sequence—first, second, third.
Classification: Separate into groups or explain the various parts of a topic.
Illustrative: Give examples and explain how those examples prove your point.
Arnaudet, Martin L. and Mary Ellen Barrett. Paragraph Development: A Guide for Students of English. 2nd edition. Englewood Cliffs, NJ: Prentice Hall Regents, 1990; On Paragraphs. The Writing Lab and The OWL. Purdue University; Organization: General Guidelines for Paragraphing. The Reading/Writing Center. Hunter College; The Paragraph. The Writing Center. Pasadena City College; Paragraph Structure. Effective Writing Center. University of Maryland; Paragraphs. Institute for Writing Rhetoric. Dartmouth College; Paragraphs. The Writing Center. University of North Carolina; Paragraphs. University Writing Center. Texas A&M University; Paragraphs and Topic Sentences. Writing Tutorial Services, Center for Innovative Teaching and Learning. Indiana University; Weissberg, Robert C. “Given and New: Paragraph Development Models from Scientific English.” TESOL Quarterly 18 (September 1984): 485-500.

Writing Tip
Coherence of Ideas is What Matters, Not Length!

Do not think of developing paragraphs in terms of their length. Length and appearance do not determine whether a part in your paper is a paragraph. It is the unity and coherence of ideas represented in a sentence or among sentences that constitutes to a good paragraph.

Bahl, Vik. Paragraph Development. English 127 Research Writing syllabus. Green River Community College.
 

Last Updated: Mar 7, 2022 9:55 AMURL: https://libguides.usc.edu/writingguide Print PageLogin to LibApps
Subjects: General Reference & Research Help
T</p>
       </main>
       <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
