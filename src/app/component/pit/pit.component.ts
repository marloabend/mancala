import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as d3 from 'd3';
import {Selection} from 'd3';

interface NodeData extends d3.SimulationNodeDatum {
  id: number;
}

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PitComponent implements AfterViewInit, OnChanges {

  @Input() disabled = false;
  @Input() value = 0;

  @Output() selectPit = new EventEmitter<void>();

  @ViewChild('pit') canvas: ElementRef<HTMLCanvasElement>;

  @HostListener('window:resize', ['$event']) onResize() {
    if (this.canvas) {
      this.initChart();
    }
  }

  private size: number;
  private data: NodeData[] = [];
  private svg: Selection<SVGGElement, unknown, null, undefined>;
  private nodes: Selection<SVGCircleElement, NodeData, SVGElement, any>;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      this.data = Array(this.value || 0)
        .fill(0)
        .map((_, i) => ({id: i}));

      if (this.svg) {
        this.updateChart();
      }
    }
  }

  onClick(): void {
    if (!this.disabled) {
      this.selectPit.emit();
    }
  }

  private initChart(): void {
    const canvas = this.canvas.nativeElement;
    this.size = canvas.clientHeight < canvas.clientWidth ? canvas.clientHeight : canvas.clientWidth;

    d3.select(canvas).select('svg').remove();

    this.svg = d3
      .select(this.canvas.nativeElement)
      .append('svg')
      .attr('width', this.size)
      .attr('height', this.size)
      .append('g');

    this.updateChart();
  }

  updateChart(): void {
    const radius = this.size / (this.value * 0.2 + 8);

    this.nodes = this.svg
      .selectAll('circle')
      .data(this.data)
      .join(
        circles => {
          const circle = circles.append('circle')
            .attr('cx', (_) => this.size / 2)
            .attr('cy', (_) => this.size / 2)
            .attr('r', 0)
            .style('fill', '#eaddca')
            .style('fill-opacity', 1)
            .attr('stroke', '#5c4033')
            .style('stroke-width', 2)
            .style('opacity', 0);

          circle
            .transition('enter').duration(500).ease(d3.easeBounce)
            .attr('r', radius)
            .style('opacity', 1)

          return circle;
        },
        circles => {
          circles
            .transition('update').duration(500).ease(d3.easeCircleInOut)
            .attr('r', radius)

          return circles;
        },
        exit => {
          return exit
            .transition('exit').duration(350).ease(d3.easeCircleOut)
            .attr('r', 0)
            .style('opacity', 0)
            .remove();
        }
      ) as Selection<SVGCircleElement, NodeData, any, any>;

    d3.forceSimulation<NodeData>()
      .force('center', d3.forceCenter().x(this.size / 2).y(this.size / 2))
      .force('charge', d3.forceManyBody().strength(.5))
      .force('collide', d3.forceCollide().strength(.075).radius(radius).iterations(1))
      .nodes(this.data)
      .on('tick', () => {
        this.nodes
          .attr('cx', d => d.x || this.size / 2)
          .attr('cy', d => d.y || this.size / 2)
      });
  }
}
